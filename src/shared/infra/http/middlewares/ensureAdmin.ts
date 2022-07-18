import { NextFunction, Request, Response } from 'express';

import { UsersRepository } from '@modules/accounts/infra/typeorm/repositories/UsersRepository';

async function ensureAdmin(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  const { id } = request.user;

  const usersRepository = new UsersRepository();

  const user = await usersRepository.findById(id);

  if (!user.isAdmin) {
    throw new Error("User isn't  admin!");
  }

  return next();
}

export { ensureAdmin };
