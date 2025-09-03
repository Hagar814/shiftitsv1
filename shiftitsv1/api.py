
import frappe
from frappe import _

@frappe.whitelist()
def get_reports_by_module():
    allowed_modules = ["Selling", "Buying", "Stock", "Accounts"]  # customize here
    reports = frappe.get_all("Report", fields=["name", "ref_doctype", "report_type", "is_standard"])

    module_map = {}

    for report in reports:
        try:
            doctype = frappe.get_doc("DocType", report.ref_doctype)
            module = doctype.module

            if module not in allowed_modules:
                continue

            if module not in module_map:
                module_map[module] = []

            module_map[module].append({
                "name": report.name,
                "route": f"/app/report/{frappe.scrub(report.name)}"
            })

        except frappe.DoesNotExistError:
            continue

    return module_map

import io
from barcode import (
    EAN13, EAN8, UPCA, Code39, ISBN13, ISBN10, ISSN, JAN, PZN
)
from barcode.writer import ImageWriter

BARCODE_CLASSES = {
    "EAN-13": EAN13,
    "EAN-8": EAN8,
    "EAN-12": UPCA,
    "UPC-A": UPCA,
    "UPC": UPCA,
    "CODE-39": Code39,
    "ISBN-13": ISBN13,
    "ISBN-10": ISBN10,
    "ISBN": ISBN13,
    "ISSN": ISSN,
    "JAN": JAN,
    "PZN": PZN,
    "GS1": Code39,
}


def generate_barcode_image(code: str, barcode_type: str):
    frappe.msgprint('hi')
    buffer = io.BytesIO()
    barcode_class = BARCODE_CLASSES.get(barcode_type, Code39)
    barcode_class(code, writer=ImageWriter()).write(buffer)
    return buffer.getvalue()


@frappe.whitelist()
def update_item_barcodes(item_name):
    frappe.msgprint('hello')
    """Can be called from JS or hook"""
    doc = frappe.get_doc("Item", item_name)
    for row in doc.barcodes:
        if row.barcode and row.barcode_type:
            try:
                img_data = generate_barcode_image(row.barcode, row.barcode_type)

                file_doc = frappe.get_doc({
                    "doctype": "File",
                    "file_name": f"{row.barcode}.png",
                    "is_private": 0,
                    "content": img_data,
                    "decode": False
                })
                file_doc.save(ignore_permissions=True)

                row.custom_barcode_attach = file_doc.file_url

            except Exception as e:
                frappe.msgprint(
                    f"❌ Barcode generation failed for {row.barcode} "
                    f"({row.barcode_type}): {str(e)}",
                    indicator="red",
                    alert=True
                )

    doc.save(ignore_permissions=True)
    return "✅ Barcode images updated successfully"
