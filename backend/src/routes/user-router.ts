import { Router } from "express";
import { container } from "src/inversify.dependencies";
import { UserController } from "src/modules/users/infrastruture/rest/userController";

const router: Router = Router();
const userController = container.get<UserController>('UserController');

/**
 * Add one user.
 */
router.post('/', userController.createUser);

/**
 * Get one user.
 */
router.get('/', userController.getUser);

export default router;
