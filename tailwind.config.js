module.exports = {
    content: [
        './resources/**/*.blade.php',
        './resources/**/*.js',
        './resources/**/*.ts',
        './resources/**/*.tsx',
        './resources/js/components/**/*.{ts,tsx}', // важно!
        './resources/**/*.css'
    ],
    theme: {
        extend: {},
    },
    plugins: [],
};
