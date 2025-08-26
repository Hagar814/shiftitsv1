frappe.pages['home-page'].on_page_load = function (wrapper) {
    var page = frappe.ui.make_app_page({
        parent: wrapper,
        title: 'Welcome',
        single_column: true
    });

    // Inject CSS to hide default Frappe wrappers
    const style = `
        <style>
            .page-head.flex {
                display: none !important;
            }
        </style>
    `;
    $(style).appendTo(page.main);

    frappe.home_page.make(page);
}

frappe.home_page = {
    make(page) {
        let body = `
            <div class="header">
                <div class="logo-container">
                    <div class="app-name">ERPNext Dashboard</div>
                </div>
                <div class="user-info">
                    <div class="user-avatar">${frappe.user.name.substr(0,2).toUpperCase()}</div>
                    <div class="user-name">${frappe.user.name}</div>
                </div>
            </div>
            
            <div class="main-content">
                <div class="welcome-text">
                    <h1>Welcome to Your Dashboard</h1>
                    <p>Access all your important modules with a single click</p>
                </div>
                
                <div class="tiles-container">
                    <div class="tile" onclick="frappe.set_route('app', 'sales-order')">
                        <div class="tile-title">Sales Order</div>
                        <div class="tile-description">Create and manage customer orders</div>
                    </div>
                    
                    <div class="tile" onclick="frappe.set_route('app', 'sales-invoice')">
                        <div class="tile-title">Sales Invoice</div>
                        <div class="tile-description">Generate invoices for sales</div>
                    </div>
                    
                    <div class="tile" onclick="frappe.set_route('app', 'purchase-order')">
                        <div class="tile-title">Purchase Order</div>
                        <div class="tile-description">Manage vendor purchase orders</div>
                    </div>
                    
                    <div class="tile" onclick="frappe.set_route('app', 'purchase-invoice')">
                        <div class="tile-title">Purchase Invoice</div>
                        <div class="tile-description">Process vendor invoices</div>
                    </div>
                    
                    <div class="tile" onclick="frappe.set_route('app', 'stock-entry')">
                        <div class="tile-title">Stock Entry</div>
                        <div class="tile-description">Manage inventory movements</div>
                    </div>
                </div>
            </div>
            
            <div class="footer">
                 <img src="/assets/shiftitsv1/images/Shift.png" alt="Footer" class="footer-img">
            </div>
        `;

        $(body).appendTo(page.main);
        
        // Custom styles for dashboard
        const css = `
            <style>

                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                }

                body {
                    background: linear-gradient(135deg, rgba(255, 253, 208, 0.79) 0%, rgba(223, 249, 255, 0.89) 100%);
                    min-height: 100vh;
                    padding: 20px;
                }

                .header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 15px 30px;
                    background: white;
                    border-radius: 12px;
                    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
                    margin-bottom: 40px;
                }

                .app-name {
                    font-size: 20px;
                    font-weight: bold;
                    color: #01345a;
                }

                .user-info {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                }

                .user-avatar {
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    background: #4BA3C3;
                    color: white;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-weight: bold;
                }

                .user-name {
                    font-size: 14px;
                    color: #01345a;
                }

                .main-content {
                    text-align: center;
                    padding-top: 100px;  
                }

                .welcome-text h1 {
                    font-size: 28px;
                    margin-bottom: 10px;
                    color: #01345a;
                }

                .welcome-text p {
                    color: #666;
                    margin-bottom: 30px;
                }

                .tiles-container {
                    display: flex;
                    justify-content: center;
                    flex-wrap: wrap;
                    gap: 20px;
                }

                .tile {
                    background: white;
                    border-radius: 12px;
                    padding: 20px;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
                    cursor: pointer;
                    transition: transform 0.2s ease, box-shadow 0.2s ease;
                    text-align: center;
                    color: #01345a;
                }

                .tile:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 6px 18px rgba(0,0,0,0.15);
                }

                .tile-icon {
                    font-size: 30px;
                    margin-bottom: 10px;
                    color: #4BA3C3;
                }

                .tile-title {
                    font-size: 16px;
                    font-weight: bold;
                    margin-bottom: 6px;
                    color: #333;
                }

                .tile-description {
                    font-size: 13px;
                    color: #777;
                }
                .content.page-container {
                    min-height: 70vh !important; /* take full screen height */
                    height: auto !important;      /* allow it to expand if content grows */
                    padding-bottom: 40px;         /* give footer some breathing space */
                }

                .page-wrapper {
                    min-height: 70%;
                }

                .footer {
                    text-align: center;
                    margin-top: 150px;
                    padding-top: 150px
                }
            </style>
        `;
        $(css).appendTo(page.main);
    }
};
