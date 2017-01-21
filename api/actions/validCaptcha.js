export default function validCaptcha(req) {
  console.log(req.body);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        isValid: req.session.captcha.toUpperCase() === req.body.captcha.toUpperCase()
      });
    }, 2000);
  });
}
