

// change navbar color according to the path
function applyNavbarColor(path) {
  let color = '#333'; // default

  if (path === '/app/home') {
    color = '#a1ebc8';
  } else if (path === '/app/overview') {
    color = '#e6cea1';
  } else if (path === '/app/accounting') {
    color = '#93b3d4';
  }
  else if (path === '/app/buying') {
    color = '#ade6a1';
  }
  else if (path === '/app/selling') {
    color = '#ece390';
  }
  else if (path === '/app/stock') {
    color = '#dd96c8';
  }
  const styleId = "dynamic-navbar-color";
  let existingStyle = document.getElementById(styleId);
  if (existingStyle) existingStyle.remove();

  const style = document.createElement("style");
  style.id = styleId;
  style.innerHTML = `
    header.navbar.navbar-expand {
      background-color: ${color} !important;
    }
    .navbar.navbar-expand {
      background-color: ${color} !important;
    }
  `;
  document.head.appendChild(style);
}

function initNavbarColorListener() {
  // Run on first load
  applyNavbarColor(window.location.pathname);

  // Hook into route changes
  frappe.router.on('change', () => {
    applyNavbarColor(window.location.pathname);
  });
}

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

// accounting submenu
function addAccountingSubmenu() {
  const check = setInterval(() => {
    const accountingBtn = document.querySelector('a[href="/app/accounting"]');
    if (!accountingBtn) return;

    clearInterval(check);

    const wrapper = document.createElement('div');
    wrapper.classList.add('accounting-wrapper');
    accountingBtn.parentNode.insertBefore(wrapper, accountingBtn);
    wrapper.appendChild(accountingBtn);

    const megaMenu = document.createElement('div');
    megaMenu.classList.add('accounting-mega-menu');

    megaMenu.innerHTML = `
    <div class="submenu-group">
      <div class="submenu-items">
        <div class="has-side-submenu">
          <a href="#">Cost Center and Budgeting</a>
          <div class="side-submenu">
            <a href="/app/cost-center">Chart of Cost Centers</a>
            <a href="/app/budget">Budget</a>
            <a href="/app/accounting-dimension">Accounting Dimension</a>
            <a href="/app/cost-center-allocation">Cost Center Allocation</a>
            <a href="/app/query-report/Budget Variance Report">Budget Variance Report</a>
            <a href="/app/monthly-distribution">Monthly Distribution</a>
          </div>
        </div>
        <div class="has-side-submenu">
          <a href="#">Payments</a>
          <div class="side-submenu">
            <a href="/app/payment-entry">Payment Entry</a>
            <a href="/app/journal-entry">Journal Entry</a>
            <a href="/app/journal-entry-template">Journal Entry Template</a>
            <a href="/app/terms-and-conditions">Terms and Conditions</a>
            <a href="/app/mode-of-payment">Mode of Payment</a>
          </div>
        </div>
      </div>
    </div>
  `;
  

    wrapper.appendChild(megaMenu);
  }, 300);
}

// Menu In the navbar
// function injectCustomButtonsIntoNavbar() {
//   const tryInject = setInterval(() => {
//     const navbarContainer = document.querySelector('header.navbar .container');
//     const logo = navbarContainer?.querySelector('.navbar-brand');

//     if (!navbarContainer || !logo) {
//       console.log('[✘] Navbar or logo not found. Retrying...');
//       return;
//     }

//     // Prevent duplicate injection
//     if (document.querySelector('.custom-navbar-buttons')) {
//       clearInterval(tryInject);
//       return;
//     }

//     // Create a container for the buttons
//     const container = document.createElement('div');
//     container.className = 'custom-navbar-buttons d-flex align-items-center gap-3 ml-3';

//     // Define your custom buttons (label + URL)
//     const navItems = [
//       { label: 'Home', href: '/app' },
//       { label: 'Overview', href: '/app/overview' },
//       { label: 'Accounting', href: '/app/accounting' },
//       { label: 'Stock', href: '/app/stock' },
//       { label: 'Payables', href: '/app/accounting/payables' },
//       { label: 'Receivables', href: '/app/accounting/receivables' },
//       { label: 'Reports', href: '/app/accounting/reports' }
//     ];

//     // Create and append each button
//     navItems.forEach(item => {
//       const btn = document.createElement('a');
//       btn.href = item.href;
//       btn.textContent = item.label;
//       btn.className = 'btn btn-outline-light rounded px-3 py-1';
//       container.appendChild(btn);
//     });

//     // Inject after logo
//     logo.insertAdjacentElement('afterend', container);
//     clearInterval(tryInject);
//     console.log('[✔] Custom buttons injected into navbar');
//   }, 300);
// }
function injectCustomButtonsIntoNavbar() {
  const tryInject = setInterval(() => {
    const navbarContainer = document.querySelector('header.navbar .container');
    const logo = navbarContainer?.querySelector('.navbar-brand');
    const navbar = navbarContainer?.querySelector('.navbar-nav');

    if (!navbarContainer || !logo || !navbar || !frappe.workspaces) return;

    if (document.querySelector('.custom-navbar-buttons')) {
      clearInterval(tryInject);
      return;
    }

    // 🔹 1. Inject Workspace Buttons
    const container = document.createElement('div');
    container.className = 'custom-navbar-buttons d-flex align-items-center gap-3 ml-3';

    const workspaceItems = Object.values(frappe.workspaces).filter(p => p.parent_page === "");
    workspaceItems.forEach(item => {
      const btn = document.createElement('a');
      const slug = frappe.router.slug(item.title);
      btn.href = item.public ? `/app/${slug}` : `/app/private/${slug}`;
      btn.textContent = __(item.title);
      btn.className = 'btn btn-outline-light rounded px-3 py-1';
      container.appendChild(btn);
    });

    // 🔹 2. Create Reports Button Wrapper
    const reportsWrapper = document.createElement('div');
    reportsWrapper.className = 'dropdown custom-dropdown reports-wrapper position-relative ml-3';

    const reportsBtn = document.createElement('a');
    reportsBtn.href = '/app/report';
    reportsBtn.className = 'btn btn-outline-light dropdown-toggle';
    reportsBtn.textContent = 'Reports';

    // Mega Menu
    const megaMenu = document.createElement('div');
    megaMenu.className = 'mega-menu submenu-group';
    megaMenu.style.display = 'none';

    // Show/hide mega menu on hover
    reportsWrapper.addEventListener('mouseenter', () => {
      megaMenu.style.display = 'flex';
    });
    reportsWrapper.addEventListener('mouseleave', () => {
      megaMenu.style.display = 'none';
    });

    // Submenu container
    const submenuItems = document.createElement('div');
    submenuItems.className = 'submenu-items';

    // 🔹 3. Fetch reports per module
    frappe.call('shiftitsv1.api.get_reports_by_module')
      .then(r => {
        const modules = r.message || {};

        Object.entries(modules).forEach(([module, reports]) => {
          const moduleGroup = document.createElement('div');
          moduleGroup.className = 'has-side-submenu';

          const moduleLabel = document.createElement('a');
          moduleLabel.href = '#';
          moduleLabel.textContent = module;

          const sideSubmenu = document.createElement('div');
          sideSubmenu.className = 'side-submenu';

          reports.forEach(report => {
            const reportLink = document.createElement('a');
            reportLink.href = '/app/report/' + encodeURIComponent(report.name);

            reportLink.textContent = report.name;
            sideSubmenu.appendChild(reportLink);
          });

          moduleGroup.appendChild(moduleLabel);
          moduleGroup.appendChild(sideSubmenu);
          submenuItems.appendChild(moduleGroup);
        });

        megaMenu.appendChild(submenuItems);
        reportsWrapper.appendChild(reportsBtn);
        reportsWrapper.appendChild(megaMenu);
        container.appendChild(reportsWrapper);
        logo.insertAdjacentElement('afterend', container);

        console.log('[✔] Workspace + Reports injected into navbar');
      });

    clearInterval(tryInject);
  }, 300);
}





// function injectCustomButtonsIntoNavbar() {
// const tryInject = setInterval(() => {
//   const navbarContainer = document.querySelector('header.navbar .container');
//   const logo = navbarContainer?.querySelector('.navbar-brand');

//   if (!navbarContainer || !logo || !frappe.workspaces) {
//     return;
//   }

//   // Prevent duplicate injection
//   if (document.querySelector('.custom-navbar-buttons')) {
//     clearInterval(tryInject);
//     return;
//   }

//   // Create a container for the buttons
//   const container = document.createElement('div');
//   container.className = 'custom-navbar-buttons d-flex align-items-center gap-3 ml-3';

//   // Get workspace items that are top-level (no parent_page)
//   const workspaceItems = Object.values(frappe.workspaces).filter(page => page.parent_page === "");

//   workspaceItems.forEach(item => {
//     const btn = document.createElement('a');

//     const slug = frappe.router.slug(item.title);
//     btn.href = item.public ? `/app/${slug}` : `/app/private/${slug}`;
//     btn.textContent = __(item.title); // support translations
//     btn.className = 'btn btn-outline-light rounded px-3 py-1';

//     container.appendChild(btn);
//   });

//   // Inject after logo
//   logo.insertAdjacentElement('afterend', container);
//   clearInterval(tryInject);
//   console.log('[✔] Workspace items injected into navbar');
// }, 300);
// }


// remove home sidebar
function removeHomeSidebar() {
  // Only apply on the /app/home route
  if (window.location.pathname === '/app/home') {
    const tryRemove = () => {
      const sidebar = document.querySelector('.col-lg-2.layout-side-section');
      if (sidebar) {
        sidebar.remove();
        observer.disconnect(); // stop observing once done
      }
    };

    // Observe the DOM for dynamic content loading
    const observer = new MutationObserver(tryRemove);
    observer.observe(document.body, { childList: true, subtree: true });

    // Try immediately in case it's already loaded
    tryRemove();
  }
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



// frappe.router.on('change', () => {
// setTimeout(() => {
//   if (window.location.pathname === '/app/home') {
//     removeHomeSidebar();
//   }
// }, 300);
// });

frappe.after_ajax(() => {
  initNavbarColorListener();
  injectCustomButtonsIntoNavbar();
  updateSearchPlaceholder();
  addAccountingSubmenu();
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


  // frappe.router.on('change', () => {
  //   setTimeout(removeHomeSidebar, 300);
  // });
  // setTimeout(() => {
  //   removeHomeSidebar();
  // }, 300);
  //setTimeout(removeHomeSidebar, 300);

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



