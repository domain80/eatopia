import { test, expect } from '@playwright/test'

test.describe('Registration Form', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the registration page
    await page.goto('/')
    await page.waitForLoadState('load')
    // wait one second
    await page.waitForTimeout(1500)
  })

  test('should register a new user successfully', async ({ page }) => {
    // Fill in the form with valid data
    await page.getByTestId('firstName-input').fill('John')
    await page.getByTestId('lastName-input').fill('Doe')
    await page.getByTestId('email-input').fill('john.doe@example.com')
    await page.getByTestId('phoneNumber-input').fill('(233) 99-999-9999')
    await page
      .getByTestId('password-input')
      .getByRole('textbox', { name: 'Password' })
      .fill('Test@123456')
    await page
      .getByTestId('confirmPassword-input')
      .getByRole('textbox', { name: 'Confirm Password' })
      .fill('Test@123456')
    await page.getByTestId('role-professional').getByRole('radio').click()

    // Submit the form
    await page.getByTestId('submit-button').click()

    // Wait for and verify success toast message
    const successToast = page.locator('.p-toast-message-success')
    await expect(successToast).toBeVisible()
    await expect(successToast.getByText('User registration successful')).toBeVisible()

    // Verify that no error messages are visible
    const errorMessages = page.locator('[data-testid$="-error"]')
    await expect(errorMessages).toHaveCount(0)
  })

  test('should show error toast when registering with existing email', async ({ page }) => {
    // Fill in the form with the same data as the previous test
    await page.getByTestId('firstName-input').fill('John')
    await page.getByTestId('lastName-input').fill('Doe')
    await page.getByTestId('email-input').fill('john.doe@example.com')
    await page.getByTestId('phoneNumber-input').fill('(233) 99-999-9999')
    await page
      .getByTestId('password-input')
      .getByRole('textbox', { name: 'Password' })
      .fill('Test@123456')
    await page
      .getByTestId('confirmPassword-input')
      .getByRole('textbox', { name: 'Confirm Password' })
      .fill('Test@123456')
    await page.getByTestId('role-professional').getByRole('radio').click()

    // Submit the form
    await page.getByTestId('submit-button').click()

    // Wait for and verify error toast message
    const errorToast = page.locator('.p-toast-message-error')
    await expect(errorToast).toBeVisible()
    await expect(errorToast.getByText('User registration failed')).toBeVisible()

    // Verify that the form values are still present (form not cleared)
    await expect(page.getByTestId('firstName-input')).toHaveValue('John')
    await expect(page.getByTestId('lastName-input')).toHaveValue('Doe')
    await expect(page.getByTestId('email-input')).toHaveValue('john.doe@example.com')
    await expect(page.getByTestId('phoneNumber-input')).toHaveValue('(233) 99-999-9999')
    await expect(page.getByTestId('role-professional').getByRole('radio')).toBeChecked()
  })

  test('should show validation errors with invalid data', async ({ page }) => {
    // Submit the form without filling any data
    await page.getByTestId('submit-button').click()

    // Verify that error messages are visible for required fields
    await expect(page.getByTestId('firstName-error')).toBeVisible()
    await expect(page.getByTestId('lastName-error')).toBeVisible()
    await expect(page.getByTestId('email-error')).toBeVisible()
    await expect(page.getByTestId('phoneNumber-error')).toBeVisible()
    await expect(page.getByTestId('password-error')).toBeVisible()
    await expect(page.getByTestId('confirmPassword-error')).toBeVisible()
    await expect(page.getByTestId('role-error')).toBeVisible()
  })

  test('should show password mismatch error', async ({ page }) => {
    // Fill in the form with mismatched passwords
    await page.getByTestId('firstName-input').fill('John')
    await page.getByTestId('lastName-input').fill('Doe')
    await page.getByTestId('email-input').fill('john.doe@example.com')
    await page.getByTestId('phoneNumber-input').fill('(233) 99-999-9999')
    await page
      .getByTestId('password-input')
      .getByRole('textbox', { name: 'Password' })
      .fill('Test@123456')
    await page
      .getByTestId('confirmPassword-input')
      .getByRole('textbox', { name: 'Confirm Password' })
      .fill('Different@123456')
    await page.getByTestId('role-professional').getByRole('radio').check()

    // Submit the form
    await page.getByTestId('submit-button').click()

    // Verify that the password mismatch error is visible
    await expect(page.getByTestId('confirmPassword-error')).toBeVisible()
  })
})
