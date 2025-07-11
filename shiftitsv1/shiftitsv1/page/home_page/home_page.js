frappe.pages['home-page'].on_page_load = function(wrapper) { 
	var page = frappe.ui.make_app_page({
		parent: wrapper,
		title: 'Menu',
		single_column: true
	});

	frappe.home_page.make(page);
}

frappe.home_page = {
	make(page) {
		// Get all items from side menu (workspace data)
		let all_pages = frappe.workspaces;
		
		// Build the HTML
		let body = `
			<div id="home-page" class="widget-group">
				<div class="widget-group-head">
					<div class="widget-group-title"></div>
				</div>
				<div class="widget-group-body grid-col-3">
		`;

		Object.values(all_pages)
			.filter((page) => page.parent_page === "")
			.forEach((item) => {
				body += `
				<div class="widget widget-shadow desk-sidebar-item standard-sidebar-item menu-widget no-click" 
					data-widget-name="${item.title}">
					<div class="widget-head">
						<a class="widget-title" href="/app/${
							item.public
								? frappe.router.slug(item.title)
								: "private/" + frappe.router.slug(item.title)
						}">
							<span class="widget-title-icon" item-icon="${item.icon || "folder-normal"}">
								${
									item.public
										? frappe.utils.icon(item.icon || "folder-normal", "md")
										: `<span class="indicator ${item.indicator_color}"></span>`
								}
							</span>
							<span class="widget-title-text">${__(item.title)}</span>
						</a>
					</div>	
				</div>
				`;
			});

		body += `</div></div>`;

		// Append to the page (without using render_template since it's not a template string)
		$(body).appendTo(page.main);
	}
}
