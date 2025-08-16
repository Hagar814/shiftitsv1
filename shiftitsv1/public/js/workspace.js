frappe.views.Workspace = class CustomWorkspace extends frappe.views.Workspace {
	constructor(wrapper) {
		super(wrapper);
	}
	show() {
		const current = frappe.router?.current_route?.[1];

		if (frappe.router?.current_route?.[0]?.toLowerCase() === "app" &&
			current === "home-page") {

			// Hide side bar
			document.querySelectorAll('.layout-side-section').forEach(el => el.classList.add('hide-side-section'));
			document.querySelectorAll('.sidebar-toggle-btn').forEach(el => el.classList.add('hide-side-section'));
			document.querySelectorAll('.menu-open-btn').forEach(el => el.classList.remove('hide-side-section'));
			document.querySelectorAll('.page-head').forEach(el => el.classList.add('hide-side-section'));

		} else {
			document.querySelectorAll('.layout-side-section').forEach(el => el.classList.remove('hide-side-section'));
			document.querySelectorAll('.sidebar-toggle-btn').forEach(el => el.classList.remove('hide-side-section'));
			document.querySelectorAll('.menu-open-btn').forEach(el => el.classList.add('hide-side-section'));
		}

		super.show();
	}
};
