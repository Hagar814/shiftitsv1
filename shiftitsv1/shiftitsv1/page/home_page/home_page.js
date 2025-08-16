frappe.pages['home-page'].on_page_load = function (wrapper) {
    var page = frappe.ui.make_app_page({
        parent: wrapper,
        title: 'Menu',
        single_column: true
    });

    frappe.home_page.make(page);
}

frappe.home_page = {
    make(page) {
        // Assign specific colors for each module
        const moduleColors = {
            "Accounting": "#F28B82",
            "Selling": "#A7C7E7",
            "Buying": "#B8E2B8",
            "Manufacturing": "#FDD835",
            "CRM": "#4BA3C3",
            "Projects": "#A8D08D",
            "Support": "#CBAACB",
            "Quality": "#F48FB1",
            "Stock": "#FFB74D",
            "Website": "#9FA8DA"
            // Add more modules here with their colors
        };

        let body = `
            <div id="home-page" style="padding: 40px; background:rgba(255, 253, 208, 0.79); min-height: 100vh;">
                <div style="display: flex; justify-content: center;">
                    <div style="
                        display: grid;
                        grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
                        gap: 20px;
                        max-width: 800px;
                        width: 100%;
                    ">
        `;

        Object.values(frappe.workspaces)
            .filter((p) => p.parent_page === "" && !["Build", "Users"].includes(p.title))
            .forEach((item) => {
                let route = item.public
                    ? frappe.router.slug(item.title)
                    : "private/" + frappe.router.slug(item.title);

                let bg_color = moduleColors[item.title] || "#B39DDB"; // fallback color

                body += `
                    <div style="
                        background: ${bg_color};
                        border-radius: 20px;
                        padding: 20px;
                        text-align: center;
                        position: relative;
                        cursor: pointer;
                        color: white;
                        box-shadow: 0 4px 8px rgba(0,0,0,0.1);
                        transition: transform 0.2s;
                    " 
                    onclick="frappe.set_route('app', '${route}')"
                    onmouseover="this.style.transform='scale(1.05)'"
                    onmouseout="this.style.transform='scale(1)'">
                        
                        ${item.badge ? `<span style="
                            position: absolute;
                            top: 8px;
                            right: 12px;
                            background: red;
                            color: white;
                            border-radius: 50%;
                            padding: 2px 6px;
                            font-size: 12px;
                            font-weight: bold;
                        ">${item.badge}</span>` : ""}
                        
                        <div style="font-size: 36px; margin-bottom: 10px;">
                            ${frappe.utils.icon(item.icon || "folder-normal", "xl")}
                        </div>
                        <div style="font-size: 14px; font-weight: bold; color: #333;">
                            ${__(item.title)}
                        </div>
                    </div>
                `;
            });

        body += `</div></div></div>`;

        $(body).appendTo(page.main);
    }
};


// frappe.pages['home-page'].on_page_load = function(wrapper) { 
// 	var page = frappe.ui.make_app_page({
// 		parent: wrapper,
// 		title: 'Menu',
// 		single_column: true
// 	});

// 	frappe.home_page.make(page);
// }

// frappe.home_page = {
// 	make(page) {
// 		// Get all items from side menu (workspace data)
// 		let all_pages = frappe.workspaces;
		
// 		// Build the HTML
// 		let body = `
// 			<div id="home-page" class="widget-group">
// 				<div class="widget-group-head">
// 					<div class="widget-group-title"></div>
// 				</div>
// 				<div class="widget-group-body grid-col-3">
// 		`;

// 		Object.values(all_pages)
// 			.filter((page) => page.parent_page === "")
// 			.forEach((item) => {
// 				body += `
// 				<div class="widget widget-shadow desk-sidebar-item standard-sidebar-item menu-widget no-click" 
// 					data-widget-name="${item.title}">
// 					<div class="widget-head">
// 						<a class="widget-title" href="/app/${
// 							item.public
// 								? frappe.router.slug(item.title)
// 								: "private/" + frappe.router.slug(item.title)
// 						}">
// 							<span class="widget-title-icon" item-icon="${item.icon || "folder-normal"}">
// 								${
// 									item.public
// 										? frappe.utils.icon(item.icon || "folder-normal", "md")
// 										: `<span class="indicator ${item.indicator_color}"></span>`
// 								}
// 							</span>
// 							<span class="widget-title-text">${__(item.title)}</span>
// 						</a>
// 					</div>	
// 				</div>
// 				`;
// 			});

// 		body += `</div></div>`;

// 		// Append to the page (without using render_template since it's not a template string)
// 		$(body).appendTo(page.main);
// 	}
// }
