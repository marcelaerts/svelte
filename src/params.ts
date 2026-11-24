import { defineParams } from '@sveltejs/kit/params';

const ONLY_NUMBERS = /^\d+$/;

export const params = defineParams({
  id: (param) => {
    if (!ONLY_NUMBERS.test(param)) return;
    return param;
  }
});
