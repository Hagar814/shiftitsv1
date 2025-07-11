// frappe.templates["page"] = `
// <div class="page-head flex">
// 	<div class="container">
// 		<div class="row flex align-center page-head-content justify-between">
// 			<div class="col-md-4 col-sm-6 col-xs-7 page-title">
// 				<!-- <div class="title-image hide hidden-md hidden-lg"></div> -->
// 				<!-- title -->
// 				<button class="btn-reset sidebar-toggle-btn">
// 					<svg class="es-icon icon-md sidebar-toggle-placeholder">
// 						<use href="#es-line-align-justify"></use>
// 					</svg>
// 					<span class="sidebar-toggle-icon">
// 						<svg class="es-icon icon-md">
// 							<use href="#es-line-sidebar-collapse">
// 							</use>
// 						</svg>
// 					</span>
// 				</button>
// 				<button class="btn-reset menu-open-btn hide-side-section">
// 					<svg class="es-icon icon-md sidebar-toggle-placeholder">
// 						<use href="#es-line-align-justify"></use>
// 					</svg>
// 				</button>
// 				<div class="flex fill-width title-area">
// 					<div>
// 						<div class="flex">
// 							<h3 class="ellipsis title-text"></h3>
// 							<span class="indicator-pill whitespace-nowrap"></span>
// 						</div>
// 						<div class="ellipsis sub-heading hide text-muted"></div>
// 					</div>
// 					<button class="btn btn-default more-button hide">
// 						<svg class="icon icon-sm">
// 							<use href="#icon-dot-horizontal">
// 							</use>
// 						</svg>
// 					</button>
// 				</div>
// 			</div>
// 			<div class="flex col page-actions justify-content-end">
// 				<!-- buttons -->
// 				<div class="custom-actions hide hidden-xs hidden-md"></div>
// 				<div class="standard-actions flex">
// 					<span class="page-icon-group hide hidden-xs hidden-sm"></span>
// 					<div class="menu-btn-group hide">
// 						<button type="button" class="btn btn-default icon-btn" data-toggle="dropdown" aria-expanded="false" aria-label="{{ __("Menu") }}">
// 							<span>
// 								<span class="menu-btn-group-label">
// 									<svg class="icon icon-sm">
// 										<use href="#icon-dot-horizontal">
// 										</use>
// 									</svg>
// 								</span>
// 							</span>
// 						</button>
// 						<ul class="dropdown-menu dropdown-menu-right" role="menu"></ul>
// 					</div>
// 					<button class="btn btn-secondary btn-default btn-sm hide"></button>
// 					<div class="actions-btn-group hide">
// 						<button type="button" class="btn btn-primary btn-sm" data-toggle="dropdown" aria-expanded="false">
// 							<span>
// 								<span class="hidden-xs actions-btn-group-label">{%= __("Actions") %}</span>
// 								<svg class="icon icon-xs">
// 									<use href="#icon-select">
// 									</use>
// 								</svg>
// 							</span>
// 						</button>
// 						<ul class="dropdown-menu dropdown-menu-right" role="menu">
// 						</ul>
// 					</div>
// 					<button class="btn btn-primary btn-sm hide primary-action"></button>
// 				</div>
// 			</div>
// 		</div>
// 	</div>
// </div>
// <div class="container page-body">
// 	<div class="page-toolbar hide">
// 		<div class="container">
// 		</div>
// 	</div>
// 	<div class="page-wrapper">
// 		<div class="page-content">
// 			<div class="workflow-button-area btn-group pull-right hide"></div>
// 			<div class="clearfix"></div>
// 		</div>
// 	</div>
// </div>
// `;
// console.log("🔁 menu-open-btn is being wired...");

// frappe.ui.Page = class CustomPage extends frappe.ui.Page {
// 	constructor(opts) {
// 		super(opts);
// 	}

// 	make() {
// 		super.make();
// 		this.setup_menupage_view();
// 	}

// 	setup_menupage_view() {
// 		let menupage_view = $(".page-head").find(".menu-open-btn");
// 		console.log("🔁 menu-open-btn is being wired...");
	
// 		menupage_view.click(() => {
// 			console.log("✅ menu-open-btn clicked");
// 			frappe.set_route(['app', 'home-page']);
// 		});
// 	}
	
	
// };
