// Forms Module
class Forms {
    constructor() {
        this.forms = document.querySelectorAll('form');
        this.init();
    }

    init() {
        this.forms.forEach(form => {
            if (form.id === 'contactForm') {
                this.initContactForm(form);
            }
        });
    }

    initContactForm(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            if (this.validateForm(form)) {
                this.handleFormSubmit(form);
            }
        });

        // Real-time validation
        const inputs = form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearError(input));
        });
    }

    validateForm(form) {
        let isValid = true;
        const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');

        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isValid = false;
            }
        });

        // Validate email
        const emailInput = form.querySelector('input[type="email"]');
        if (emailInput && emailInput.value && !Utils.validateEmail(emailInput.value)) {
            this.showError(emailInput, 'Please enter a valid email address');
            isValid = false;
        }

        // Validate phone if provided
        const phoneInput = form.querySelector('input[type="tel"]');
        if (phoneInput && phoneInput.value && !Utils.validatePhone(phoneInput.value)) {
            this.showError(phoneInput, 'Please enter a valid phone number');
            isValid = false;
        }

        return isValid;
    }

    validateField(field) {
        const value = field.value.trim();
        
        if (field.hasAttribute('required') && !value) {
            this.showError(field, 'This field is required');
            return false;
        }

        if (field.type === 'email' && value && !Utils.validateEmail(value)) {
            this.showError(field, 'Please enter a valid email address');
            return false;
        }

        this.clearError(field);
        return true;
    }

    showError(field, message) {
        this.clearError(field);
        field.classList.add('error');
        
        const errorElement = document.createElement('span');
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        field.parentNode.appendChild(errorElement);
    }

    clearError(field) {
        field.classList.remove('error');
        const errorMessage = field.parentNode.querySelector('.error-message');
        if (errorMessage) {
            errorMessage.remove();
        }
    }

    async handleFormSubmit(form) {
        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        // Disable button and show loading state
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';

        try {
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);

            // Simulate API call
            await this.sendFormData(data);

            // Show success message
            this.showSuccessMessage(form, 'Thank you for your message! We will get back to you soon.');
            form.reset();
        } catch (error) {
            this.showErrorMessage(form, 'Something went wrong. Please try again.');
        } finally {
            submitButton.disabled = false;
            submitButton.textContent = originalText;
        }
    }

    async sendFormData(data) {
        // Simulate API call - replace with actual endpoint
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log('Form data:', data);
                resolve(data);
            }, 1000);
        });
    }

    showSuccessMessage(form, message) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'form-message success';
        messageDiv.textContent = message;
        form.insertBefore(messageDiv, form.firstChild);
        
        setTimeout(() => {
            messageDiv.remove();
        }, 5000);
    }

    showErrorMessage(form, message) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'form-message error';
        messageDiv.textContent = message;
        form.insertBefore(messageDiv, form.firstChild);
        
        setTimeout(() => {
            messageDiv.remove();
        }, 5000);
    }
}


