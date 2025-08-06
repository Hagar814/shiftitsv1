
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

