interface Response {
  ok: boolean;
  data?: unknown;
  errors?: unknown;
}

const successfulResponse = (data: unknown): Response => ({
  ok: true,
  data,
});

const failedResponse = (errors: unknown): Response => ({
  ok: false,
  errors,
});

export { failedResponse, successfulResponse };
