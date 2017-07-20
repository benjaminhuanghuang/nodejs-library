1. In User Schema, add favorites field

2. Add API route and permission checking
    contentRoutes.post('/entities/favorite/:id', catchErrors(entityController.addOrRemoveFavorite));

3. UI
    