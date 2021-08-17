module.exports = {
    env: {
        browser: true,
        node: true
    },
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended',
        'prettier',
        'plugin:prettier/recommended'
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true
        },
        ecmaVersion: 2020,
        sourceType: 'module'
    },
    plugins: [
        '@typescript-eslint',
        'prettier',
        'simple-import-sort',
        'sort-destructure-keys',
        'sort-keys-fix',
        'typescript-sort-keys'
    ],
    rules: {
        '@typescript-eslint/ban-ts-comment': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-empty-interface': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
        'eol-last': ['error', 'always'],
        'import/first': 'off',
        'import/newline-after-import': 'off',
        'import/no-duplicates': 'off',
        'lines-between-class-members': ['error', 'always'],
        'newline-before-return': 'error',
        'no-unused-vars': 'off',
        'padding-line-between-statements': [
            'error',
            { blankLine: 'always', next: ['const', 'let', 'var', 'function'], prev: 'import' },
            { blankLine: 'always', next: '*', prev: ['const', 'let', 'var'] },
            {
                blankLine: 'any',
                next: ['const', 'let', 'var'],
                prev: ['const', 'let', 'var']
            }
        ],
        quotes: ['error', 'single', { allowTemplateLiterals: true }],
        'react/prop-types': 'off',
        'simple-import-sort/imports': [
            'warn',
            {
                groups: [
                    ['^react', '^@?\\w'],
                    ['^components'],
                    ['^data'],
                    ['^libs'],
                    ['^const'],
                    ['^static'],
                    ['^\\u0000']
                ]
            }
        ],
        'sort-destructure-keys/sort-destructure-keys': 2,
        'sort-imports': 'off',
        'sort-keys-fix/sort-keys-fix': 'error',
        'typescript-sort-keys/interface': [
            'error',
            'asc',
            { caseSensitive: true, natural: false, requiredFirst: false }
        ],
        'typescript-sort-keys/string-enum': ['error', 'asc', { caseSensitive: true }]
    },
    settings: {
        react: {
            version: 'detect'
        }
    }
};
