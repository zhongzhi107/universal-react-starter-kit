module.exports = {
  extends: 'stylelint-config-standard',
  rules: {
    // 允许的最大嵌套层数
    'max-nesting-depth': 3,

    // 忽略 global 未知伪类错误
    'selector-pseudo-class-no-unknown': [
      true,
      {
        'ignorePseudoClasses': ['global'],
      }
    ],
    'at-rule-no-unknown': [
      true,
      {
        'ignoreAtRules': ['import-normalize']
      }
    ]
  },
  ignoreFiles: ['prd/**']
};
