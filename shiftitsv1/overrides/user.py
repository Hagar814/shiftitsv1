# shiftitsv1/overrides/user.py

import frappe
from frappe.core.doctype.user.user import User as FrappeUser

class CustomUser(FrappeUser):
    def before_save(self):


        # 1. Define the allowed modules
        allowed_modules = [
            "Accounts", "Buying", "Contacts", "Core", "Desk", 
            "Maintenance", "Selling", "Stock"
        ]

        # 2. Block all modules not in allowed list
        all_modules = frappe.get_all("Module Def", pluck="name")
        blocked = [m for m in all_modules if m not in allowed_modules]

        self.set("block_modules", [])
        for module in blocked:
            self.append("block_modules", {"module": module})

        # 3. Define roles to assign (permissions)
        required_roles = [
            "Stock Manager", "Stock User", "Sales User", "Sales Master Manager",
            "Sales Manager", "Purchase Manager", "Purchase Master Manager",
            "Purchase User", "Maintenance User", "Maintenance Manager",
            "Item Manager", "Inbox User", "Dashboard Manager", "Customer",
            "Auditor", "Accounts Manager", "Accounts User",
            "Agriculture Manager", "Agriculture User"
        ]

        # 4. Assign roles if not already assigned
        existing_roles = {role.role for role in self.roles}
        for role in required_roles:
            if role not in existing_roles:
                self.append("roles", {"role": role})

