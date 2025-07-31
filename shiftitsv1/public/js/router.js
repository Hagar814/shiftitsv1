
frappe.router.render = function () {
	if (this.current_route[0]) {
		this.render_page();
	} else {
		// Redirect to your custom page
		frappe.set_route(['app', 'home-page']);
	}
};
// frappe.views.pageview.show = function(name) {
//     if (!name || name === "") {
//         console.log("🔁 Empty route fallback detected — redirecting to /app/home-page");
//         frappe.set_route("app/home-page");
//         return;
//     }

//     // Use the proper fallback loader
//     frappe.views.pageview.with_page(name);
// };

