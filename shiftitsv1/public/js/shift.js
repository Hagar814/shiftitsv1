

//  replace search word 
function updateSearchPlaceholder() {
let attempts = 0;
const maxAttempts = 10;

const tryUpdate = () => {
  const searchInput = document.getElementById('navbar-search');
  if (searchInput) {
    searchInput.placeholder = 'Search';
  } else if (attempts < maxAttempts) {
    attempts++;
    setTimeout(tryUpdate, 300);
  }
};

tryUpdate();
}


function addModuleSubmenu(moduleName, items) {
 const check = setInterval(() => {
    const navbarButtons = document.querySelector('.custom-navbar-buttons.d-flex.align-items-center.gap-3.ml-3');
    if (!navbarButtons) return;

    // Find module button by text
    const moduleBtn = Array.from(navbarButtons.querySelectorAll('a, button, div'))
      .find(el => el.textContent.trim().toLowerCase() === moduleName.toLowerCase());

    if (!moduleBtn) return;

    clearInterval(check);

    // Wrap the module button
    const wrapper = document.createElement('div');
    wrapper.classList.add(`${moduleName.toLowerCase()}-wrapper`);
    moduleBtn.parentNode.insertBefore(wrapper, moduleBtn);
    wrapper.appendChild(moduleBtn);

    // Create mega menu
    const megaMenu = document.createElement('div');
    megaMenu.classList.add(`${moduleName.toLowerCase()}-mega-menu`);

    // Build submenu list items
    let listHTML = '<ol class="sub-menu">';
    items.forEach((item, index) => {
      const colorClass = ['item--a', 'item--b', 'item--c'][index % 3]; // cycle colors
      listHTML += `
        <li class="menu-item ${colorClass}">
          <a href="${item.href}"><span>${item.label}</span></a>
        </li>
      `;
    });
    listHTML += '</ol>';

    megaMenu.innerHTML = listHTML;
    wrapper.appendChild(megaMenu);
  }, 300);
}

// --- Add for each module ---

// Accounting
addModuleSubmenu("Accounting", [
  { label: "Payment Entry", href: "/app/payment-entry" },
  { label: "Journal Entry", href: "/app/journal-entry" },
  { label: "Sales Invoice", href: "/app/sales-invoice" },
  { label: "Purchase Invoice", href: "/app/purchase-invoice" },
  { label: "Cost Center", href: "/app/cost-center" }
]);

// Buying
addModuleSubmenu("Buying", [
  { label: "Purchase Order", href: "/app/purchase-order" },
  { label: "Supplier", href: "/app/supplier" }
]);

// Selling
addModuleSubmenu("Selling", [
  { label: "Sales Order", href: "/app/sales-order" },
  { label: "Customer", href: "/app/customer" }
]);

// Stock
addModuleSubmenu("Stock", [
  { label: "Stock Entry", href: "/app/stock-entry" },
  { label: "Stock Ledger Entry", href: "/app/stock-ledger-entry" },
  { label: "Warehouse", href: "/app/warehouse" },
  { label: "Purchase Receipt", href: "/app/purchase-receipt" },
  { label: "Delivery Note", href: "/app/delivery-note" },
  { label: "Closing Stock Balance", href: "/app/closing-stock-balance" },
  { label: "Item", href: "/app/item" },
  { label: "Item Attribute", href: "/app/item-attribute" },
  { label: "Item Price", href: "/app/item-price" },
  { label: "Serial No", href: "/app/serial-no" },
  { label: "Batch", href: "/app/batch" },
  { label: "Serial and Batch Bundle", href: "/app/serial-and-batch-bundle" }
]);

// function injectCustomButtonsIntoNavbar() {
//   const tryInject = setInterval(() => {
//     const navbarContainer = document.querySelector('header.navbar .container');
//     const logo = navbarContainer?.querySelector('.navbar-brand');
//     const navbar = navbarContainer?.querySelector('.navbar-nav');

//     if (!navbarContainer || !logo || !navbar || !frappe.workspaces) return;

//     if (document.querySelector('.custom-navbar-buttons')) {
//       clearInterval(tryInject);
//       return;
//     }

//     // 🔹 1. Inject Workspace Buttons
//     const container = document.createElement('div');
//     container.className = 'custom-navbar-buttons d-flex align-items-center gap-3 ml-3';

//     const workspaceItems = Object.values(frappe.workspaces).filter(p => p.parent_page === "");
//     workspaceItems.forEach(item => {
//       const btn = document.createElement('a');
//       const slug = frappe.router.slug(item.title);
//       btn.href = item.public ? `/app/${slug}` : `/app/private/${slug}`;
//       btn.textContent = __(item.title);
//       btn.className = 'btn btn-outline-light rounded px-3 py-1';
//       container.appendChild(btn);
//     });

//     // 🔹 2. Create Reports Button Wrapper
//     const reportsWrapper = document.createElement('div');
//     reportsWrapper.className = 'dropdown custom-dropdown reports-wrapper position-relative ml-3';

//     const reportsBtn = document.createElement('a');
//     reportsBtn.href = '/app/report';
//     reportsBtn.className = 'btn btn-outline-light dropdown-toggle';
//     reportsBtn.textContent = 'Reports';

//     // Mega Menu
//     const megaMenu = document.createElement('div');
//     megaMenu.className = 'mega-menu submenu-group';
//     megaMenu.style.display = 'none';

//     // Show/hide mega menu on hover
//     reportsWrapper.addEventListener('mouseenter', () => {
//       megaMenu.style.display = 'flex';
//     });
//     reportsWrapper.addEventListener('mouseleave', () => {
//       megaMenu.style.display = 'none';
//     });

//     // Submenu container
//     const submenuItems = document.createElement('div');
//     submenuItems.className = 'submenu-items';

//     // 🔹 3. Fetch reports per module
//     frappe.call('shiftitsv1.api.get_reports_by_module')
//       .then(r => {
//         const modules = r.message || {};

//         Object.entries(modules).forEach(([module, reports]) => {
//           const moduleGroup = document.createElement('div');
//           moduleGroup.className = 'has-side-submenu';

//           const moduleLabel = document.createElement('a');
//           moduleLabel.href = '#';
//           moduleLabel.textContent = module;

//           const sideSubmenu = document.createElement('div');
//           sideSubmenu.className = 'side-submenu';

//           reports.forEach(report => {
//             const reportLink = document.createElement('a');
//             reportLink.href = '/app/report/' + encodeURIComponent(report.name);

//             reportLink.textContent = report.name;
//             sideSubmenu.appendChild(reportLink);
//           });

//           moduleGroup.appendChild(moduleLabel);
//           moduleGroup.appendChild(sideSubmenu);
//           submenuItems.appendChild(moduleGroup);
//         });

//         megaMenu.appendChild(submenuItems);
//         reportsWrapper.appendChild(reportsBtn);
//         reportsWrapper.appendChild(megaMenu);
//         container.appendChild(reportsWrapper);
//         logo.insertAdjacentElement('afterend', container);

//         console.log('[✔] Workspace + Reports injected into navbar');
//       });

//     clearInterval(tryInject);
//   }, 300);
// }

function injectCustomButtonsIntoNavbar() {
  const tryInject = setInterval(() => {
    const navbarContainer = document.querySelector('header.navbar .container');
    const logo = navbarContainer?.querySelector('.navbar-brand');

    if (!navbarContainer || !logo) return;

    if (document.querySelector('.custom-navbar-buttons')) {
      clearInterval(tryInject);
      return;
    }

    // 🔹 1. Create custom container
    const container = document.createElement('div');
    container.className = 'custom-navbar-buttons d-flex align-items-center gap-3 ml-3';

    // 🔹 2. Hardcoded module buttons (no href paths)
    const modules = [
      { title: 'Accounting' },
      { title: 'Buying' },
      { title: 'Selling' },
      { title: 'Stock' }
    ];

    modules.forEach(mod => {
      const btn = document.createElement('a');
      btn.textContent = mod.title;
      btn.className = 'btn btn-outline-light rounded px-3 py-1';
      container.appendChild(btn);
    });

    // 🔹 3. Create Reports Button Wrapper
    const reportsWrapper = document.createElement('div');
    reportsWrapper.className = 'dropdown custom-dropdown reports-wrapper position-relative ml-3';

    const reportsBtn = document.createElement('a');
    reportsBtn.href = '/app/report';
    reportsBtn.className = 'btn btn-outline-light dropdown-toggle';
    reportsBtn.textContent = 'Reports';

    const megaMenu = document.createElement('div');
    megaMenu.className = 'mega-menu submenu-group';
    megaMenu.style.display = 'none';

    reportsWrapper.addEventListener('mouseenter', () => {
      megaMenu.style.display = 'flex';
    });
    reportsWrapper.addEventListener('mouseleave', () => {
      megaMenu.style.display = 'none';
    });

    const submenuItems = document.createElement('div');
    submenuItems.className = 'submenu-items';

// 🔹 4. Fetch reports per module
frappe.call('shiftitsv1.api.get_reports_by_module')
  .then(r => {
    const modules = r.message || {};

// Custom filtering logic for each module
const reportsByModule = {
  "Accounts": [
    "General Ledger",
    "Payment Ledger",
    "General and Payment Ledger Comparison",
    "Supplier Ledger Summary",
    "Customer Ledger Summary",
    "Accounts Payable Summary",
    "Accounts Receivable Summary",
    "Accounts Payable",
    "Accounts Receivable",
    "Account Balance",
    "Cheques and Deposits Incorrectly cleared",
    "Gross Profit",
    "Gross and Net Profit Report",
    "Voucher-wise Balance",
    "Asset Depreciation Ledger",
    "Deferred Revenue and Expense",
    "Inactive Sales Items",
    "Delivered Items To Be Billed",
    "Received Items To Be Billed",
    "Billed Items To Be Received",
    "Sales Payment Summary"
  ],
  "Stock": [
    "Stock Balance",
    "Stock Ledger",
    "Stock Ledger Variance",
    "Item Prices",
    "Items To Be Requested",
    "Requested Items To Be Transferred",
    "Serial and Batch Summary",
    "Batch-Wise Balance History",
    "Batch Item Expiry Status"
  ],
  "Selling": [
    "Sales order",
    "Sales Analytics",
    "Sales Order Analysis",
    "Sales Person-wise Transaction Summary",
    "Payment Terms Status for Sales Order",
    "Pending SO Items For Purchase Request",
    "Item-wise Sales History",
    "Available Stock for Packing Items"
  ],
  "Buying": "ALL" // show everything
};

// Normalize "Accounting" -> "Accounts" just in case API uses that name
const canonical = name => (name === "Accounting" ? "Accounts" : name);

// Desired visual order
const desiredOrder = ["Accounts", "Stock", "Selling", "Buying"];

// Build submenu strictly in desired order
desiredOrder.forEach(wantedName => {
  // find the matching key from API (it might be "Accounts" or "Accounting")
  const apiKey = Object.keys(modules).find(k => canonical(k) === wantedName);
  if (!apiKey) return;

  const canon = canonical(apiKey);
  const reports = modules[apiKey] || [];
  const allowed = reportsByModule[canon] === "ALL"
    ? reports.map(r => r.name)
    : reportsByModule[canon];

  // wrapper div for the module
  const moduleGroup = document.createElement('div');
  moduleGroup.className = `${canon.toLowerCase()}-wrapper`;
  moduleGroup.dataset.module = canon; // <-- now you have data-module if you still want CSS ordering

  // label
  const moduleLabel = document.createElement('a');
  moduleLabel.href = "#";
  moduleLabel.textContent = canon; // shows "Accounts", "Stock", etc.
  moduleGroup.appendChild(moduleLabel);

  // side submenu
  const sideSubmenu = document.createElement('div');
  sideSubmenu.className = `${canon.toLowerCase()}-mega-menu`;

  const ul = document.createElement('ul');
  ul.className = "sub-menu";

  allowed.forEach(repName => {
    const found = reports.find(r => r.name === repName);
    if (!found) return;

    const li = document.createElement('li');
    li.className = "menu-item";

    const link = document.createElement('a');
    link.href = '/app/report/' + encodeURIComponent(found.name);
    link.innerHTML = `<span>${found.name}</span>`;

    li.appendChild(link);
    ul.appendChild(li);
  });

  sideSubmenu.appendChild(ul);
  moduleGroup.appendChild(sideSubmenu);
  submenuItems.appendChild(moduleGroup);
});
    megaMenu.appendChild(submenuItems);
    reportsWrapper.appendChild(reportsBtn);
    reportsWrapper.appendChild(megaMenu);
    container.appendChild(reportsWrapper);

    // Inject into navbar
    logo.insertAdjacentElement('afterend', container);

    console.log('[✔] Reports submenu styled like modules');
  });


    clearInterval(tryInject);
  }, 300);
}




function overrideRouterRender() {
	const waitForRouter = setInterval(() => {
		if (frappe.router && frappe.router.render) {
			console.log("✅ Overriding frappe.router.render");

			frappe.router.render = function () {
				if (this.current_route && this.current_route[0]) {
					this.render_page();
					
					// Delay to wait for DOM to update
					setTimeout(() => {
						addAccountingSubmenu();
					}, 300);  // may adjust this timing if needed

				} else {
					console.log("🔁 Redirecting to /app/home-page");
					frappe.set_route(['app', 'home-page']);
				}
			};

			clearInterval(waitForRouter);
		}
	}, 100);
}


frappe.after_ajax(() => {

  injectCustomButtonsIntoNavbar();
  updateSearchPlaceholder();
  addModuleSubmenu();
  if (window.location.pathname === '/app/home') {
    removeHomeSidebar();
  }
  overrideRouterRender();

	const route = frappe.router?.current_route || [];
	const fullRouteStr = route.join('/');

	const isBlankRoute =
		(!route[0] || (route[0] === 'app' && !route[1])) &&
		!fullRouteStr.includes('home-page') &&
		!fullRouteStr.includes('report') &&
		!fullRouteStr.includes('Form') &&
		!fullRouteStr.includes('view') &&
		!fullRouteStr.includes('List');

	const alreadyRedirected = sessionStorage.getItem('already_redirected_homepage');

	if (isBlankRoute && !alreadyRedirected) {
		console.log("🔁 First-time redirect to /app/home-page");
		sessionStorage.setItem('already_redirected_homepage', '1');
		frappe.set_route('app/home-page');
	}

});
  
(function () {
  const originalMakeAppPage = frappe.ui.make_app_page;

  frappe.ui.make_app_page = function (opts) {
    const page = originalMakeAppPage.call(this, opts);
    setTimeout(() => {
      movePageActionsToSidebarGap();
    }, 0);
    return page;
  };

  function movePageActionsToSidebarGap() {
    const route = frappe.get_route_str();
    let tries = 0;
    const maxTries = 50;
  
    const interval = setInterval(() => {
      const page = frappe.ui.pages[route];
      const $wrapper = page?.wrapper || $(document);
  
      const $layoutMain = $wrapper.find('.layout-main');
      const $sidebar = $layoutMain.find('.layout-side-section');
      const $sidebarContent = $sidebar.children(); // Save content only
      const $pageActions = $wrapper.find('.page-actions');
      const $pageHeadContent = $wrapper.find('.page-head .page-head-content');
  
      if ($pageActions.length && $layoutMain.length && $sidebar.length) {
        clearInterval(interval);
  
        // Skip if no buttons
        if ($pageActions.find('button').length === 0) {
          console.warn('[CustomTheme] No buttons inside .page-actions — skipping.');
          return;
        }
  
        // Remove previous injection
        $layoutMain.find('.custom-action-slot').remove();
  
        // Create custom container
        const $customSlot = $('<div class="custom-action-slot"></div>');
        $sidebar.before($customSlot);
  
        // Style the custom slot
        $customSlot.css({
          width: `${$sidebar.outerWidth()}px`,
          minHeight: `${$sidebar.outerHeight()}px`,
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          padding: '12px',
          background: '#fff',
          overflowY: 'auto',
          borderRight: '1px solid #eee',
        });
  
        // Grab button groups
        const $primaryAction = $pageActions.find('.primary-action').detach();
        const $customActions = $pageActions.find('.custom-actions').detach();
        const $standardActions = $pageActions.find('.standard-actions').detach();
        const $otherButtons = $pageActions.find('button:not(.primary-action)').detach();
  
        // Style all buttons
        const allButtons = $primaryAction
          .add($customActions)
          .add($standardActions)
          .add($otherButtons);
  
        allButtons.find('button').css({
          width: '100%',
          display: 'block',
        });
  
        // Inject buttons in order
        if ($primaryAction.length) $customSlot.append($primaryAction);
        if ($customActions.length) $customSlot.append($customActions);
        if ($standardActions.length) $customSlot.append($standardActions);
        if ($otherButtons.length) $customSlot.append($otherButtons);
  
        // 👉 Inject sidebar content after buttons
        $customSlot.append($sidebarContent);
  
        // 🗑️ Remove original sidebar container
        $sidebar.remove();
  
        // Clean up page-actions
        if ($pageHeadContent.find('.page-actions').length) {
          $pageHeadContent.find('.page-actions').remove();
        }
  
        console.log('[CustomTheme] Buttons and sidebar moved into custom-action-slot.');
      }
  
      if (++tries > maxTries) {
        clearInterval(interval);
        console.warn('[CustomTheme] Timed out waiting for layout-main/sidebar.');
      }
    }, 100);
  }
})();

// (function () {
//   const originalMakeAppPage = frappe.ui.make_app_page;

//   frappe.ui.make_app_page = function (opts) {
//     const page = originalMakeAppPage.call(this, opts);
//     setTimeout(() => {
//       movePageActionsToSidebarGap();
//     }, 0);
//     return page;
//   };

//   function movePageActionsToSidebarGap() {
//     const route = frappe.get_route_str();
//     let tries = 0;
//     const maxTries = 50;

//     const interval = setInterval(() => {
//       const page = frappe.ui.pages[route];
//       const $wrapper = page?.wrapper || $(document);

//       const $layoutMain = $wrapper.find('.layout-main');
//       const $sidebar = $layoutMain.find('.layout-side-section');
//       const $pageActions = $wrapper.find('.page-actions');
//       const $pageHeadContent = $wrapper.find('.page-head .page-head-content');

//       if ($pageActions.length && $layoutMain.length && $sidebar.length) {
//         clearInterval(interval);

//         // Skip if no buttons
//         if ($pageActions.find('button').length === 0) {
//           console.warn('[CustomTheme] No buttons inside .page-actions — skipping.');
//           return;
//         }

//         // Remove previous injection
//         $layoutMain.find('.custom-action-slot').remove();

//         // Create custom container
//         const $customSlot = $('<div class="custom-action-slot"></div>');
//         $sidebar.before($customSlot);

//         // Style the custom slot
//         $customSlot.css({
//           width: `${$sidebar.outerWidth()}px`,
//           minHeight: `${$sidebar.outerHeight()}px`,
//           display: 'flex',
//           flexDirection: 'column',
//           gap: '12px',
//           padding: '12px',
//           background: '#fff',
//           overflowY: 'auto',
//           borderRight: '1px solid #eee',
//         });

//         // Grab button groups
//         const $primaryAction = $pageActions.find('.primary-action').detach();
//         const $customActions = $pageActions.find('.custom-actions').detach();
//         const $standardActions = $pageActions.find('.standard-actions').detach();
//         const $otherButtons = $pageActions.find('button:not(.primary-action)').detach();

//         // Style all buttons
//         const allButtons = $primaryAction
//           .add($customActions)
//           .add($standardActions)
//           .add($otherButtons);

//         allButtons.find('button').css({
//           width: '100%',
//           display: 'block',
//         });

//         // Inject in correct order
//         if ($primaryAction.length) $customSlot.append($primaryAction);
//         if ($customActions.length) $customSlot.append($customActions);
//         if ($standardActions.length) $customSlot.append($standardActions);
//         if ($otherButtons.length) $customSlot.append($otherButtons);

//         // Remove leftover .page-actions (if still exists in header)
//         if ($pageHeadContent.find('.page-actions').length) {
//           $pageHeadContent.find('.page-actions').remove();
//         }

//         console.log('[CustomTheme] Buttons extracted and placed at top of custom-action-slot.');
//       }

//       if (++tries > maxTries) {
//         clearInterval(interval);
//         console.warn('[CustomTheme] Timed out waiting for layout-main/sidebar.');
//       }
//     }, 100);
//   }
// })();



