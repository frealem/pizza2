const { AbilityBuilder } =require('@casl/ability');

const defineAbilitiesFor = (role) => {
    const { can, cannot, build } = new AbilityBuilder();

    if (role === 'superadmin') {
        can('manage', 'all'); // Superadmin can do anything
    } else if (role === 'manager') {
        can('manage', 'Order'); // Managers can manage orders
        can('view', 'User'); // Managers can view users
        cannot('delete', 'User'); // Managers cannot delete users
    } else if (role === 'customer') {
        can('view', 'Order');
        can('view', 'User'); // Customers can view their own orders
    }

    return build(); // Returns an ability object
};
module.exports={defineAbilitiesFor}