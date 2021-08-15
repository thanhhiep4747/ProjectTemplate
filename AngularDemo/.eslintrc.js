module.exports = {
    /**
     * See packages/eslint-plugin/src/configs/README.md
     * for what this recommended config contains.
     */
    env: {
        es6: true,
        browser: true,
        node: true
    },
    ignorePatterns: ['.eslintrc.js'],
    extends: ['plugin:@angular-eslint/recommended'],
    rules: {
        // ORIGINAL tslint.json -> "directive-selector": [true, "attribute", "app", "camelCase"],
        '@angular-eslint/directive-selector': ['error', { type: 'attribute', prefix: 'app', style: 'camelCase' }],
        // ORIGINAL tslint.json -> "component-selector": [true, "element", "app", "kebab-case"],
        '@angular-eslint/component-selector': ['error', { type: 'element', prefix: 'app', style: 'kebab-case' }]
    },
    overrides: [
        {
            files: ['*.html'],
            rules: {
                'max-len': 'off'
            }
        },
        // Custom rules for TypeScript
        {
            files: ['*.ts'],
            extends: [
                'plugin:@angular-eslint/recommended',
                // AirBnB Styleguide rules
                'airbnb-typescript/base',
                // Settings for Prettier
                'prettier/@typescript-eslint',
                'plugin:prettier/recommended'
            ],
            parser: '@typescript-eslint/parser',
            parserOptions: {
                ecmaVersion: 2021,
                project: ['tsconfig.json', 'tsconfig.app.json'],
                sourceType: 'module'
            },
            rules: {
                'no-unused-expressions': 'off',
                '@typescript-eslint/no-unused-expressions': 'off',
                'no-console': ['error', { allow: ['warn', 'error'] }],
                'no-debugger': 'error',
                'no-use-before-define': 'error',
                'no-continue': 'off',
                'lines-between-class-members': 'off',
                'no-underscore-dangle': 'off',
                '@typescript-eslint/lines-between-class-members': 'off',
                '@typescript-eslint/no-unused-vars': 'error',
                'prefer-destructuring': 'off',
                'import/no-unresolved': 'off',
                'import/prefer-default-export': 'off',
                'class-methods-use-this': 'off',
                '@typescript-eslint/dot-notation': 'off',
                '@typescript-eslint/unbound-method': [
                    'error',
                    {
                        ignoreStatic: true
                    }
                ],
                'default-case': 'error',
                '@typescript-eslint/interface-name-prefix': 'off',
                '@typescript-eslint/explicit-function-return-type': 'off',
                '@typescript-eslint/explicit-module-boundary-types': 'off',
                '@typescript-eslint/no-explicit-any': 'error',
                '@typescript-eslint/no-use-before-define': ['error'],
                'max-classes-per-file': ['error'],
                'operator-assignment': ['error', 'always'],
                'prettier/prettier': ['off', { endOfLine: 'auto' }],
                'no-param-reassign': [2, { props: false }],
                'no-plusplus': [2, { allowForLoopAfterthoughts: true }],
                'no-async-promise-executor': 'error',
                'no-await-in-loop': 'error',
                'no-alert': 'error',
                'no-cond-assign': ['error', 'always'],
                'no-constant-condition': 'error',
                'no-dupe-else-if': 'error',
                'no-duplicate-case': 'error',
                'no-empty': 'error',
                'no-extra-parens': 'error',
                'no-extra-semi': 'error',
                curly: ['error', 'all'],
                'no-new': 'error',
                'no-redeclare': 'error',
                'no-useless-catch': 'error',
                'no-useless-escape': 'error',
                'no-lonely-if': 'error',
                'no-mixed-spaces-and-tabs': ['error', 'smart-tabs'],
                'no-multi-assign': 'error',
                'no-multiple-empty-lines': ['error', { max: 2 }],
                'no-unneeded-ternary': 'error',
                'nonblock-statement-body-position': ['error', 'below'],
                quotes: ['error', 'single', { allowTemplateLiterals: true }],
                semi: ['error', 'always'],
                'arrow-body-style': ['error', 'always'],
                'no-this-before-super': 'error',
                'no-useless-rename': 'error',
                'prefer-rest-params': 'error',
                'no-loop-func': 'off',
                'func-names': 'error',
                '@typescript-eslint/no-loop-func': 'off',
                '@angular-eslint/component-selector': 'off'
            }
        }
    ]
};
