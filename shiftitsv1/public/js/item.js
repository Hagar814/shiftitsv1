frappe.ui.form.on("Item", {
    after_save: function(frm) {
        console.log("🔥 after_save triggered for Item:", frm.doc.name);
        frappe.call({
            method: "shiftitsv1.api.update_item_barcodes",
            args: {
                item_name: frm.doc.name
            },
            callback: function(r) {
                console.log("📡 API response:", r);
                if (r.message) {
                    frappe.msgprint(r.message);
                    frm.reload_doc();
                }
            }
        });
    }
});
