module.exports = {
    "env": {
        "node": true,
        "commonjs": true,
        "es2020": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaVersion": 11
    },
    "rules": {
        "no-console": ["error", { allow: ["info", "error", "warn"] }] 
    }
};
