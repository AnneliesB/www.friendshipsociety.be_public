function generateErrorTemplate(className, message) {
    return `
    <div class="error__container ${className}">
            <p>${message}</p>
    </div>`
}