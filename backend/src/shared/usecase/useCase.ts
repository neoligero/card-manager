export interface UseCase<Request = any, Response = any> {
  invoke(request: Request): Response;
}