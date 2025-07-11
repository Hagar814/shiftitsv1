console.log(frappe.router.render.toString())
frappe.router.render = function () {
	if (this.current_route[0]) {
		this.render_page();
	} else {
		// Redirect to your custom page
		frappe.set_route(['app', 'home-page']);
	}
};
