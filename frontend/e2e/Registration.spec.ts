import { test, expect } from '@playwright/test'

test.describe('Registration Form', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the registration page
    await page.goto('/')
  })

  test('should submit form successfully with valid data', async ({ page }) => {
    await page.locator('body').click()
    await page.getByTestId('firstName-input').fill('John')
    await page.getByTestId('lastName-input').fill('Doe')
    await page.getByTestId('email-input').fill('john.doe@example.com')
    await page.getByTestId('phone-input').fill('(233) 99-999-9999')
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

    // Verify that no error messages are visible
    const errorMessages = page.locator('[data-testid$="-error"]')
    await expect(errorMessages).toHaveCount(0)

    // Verify that the form values are correct
    await expect(page.getByTestId('firstName-input')).toHaveValue('John')
    await expect(page.getByTestId('lastName-input')).toHaveValue('Doe')
    await expect(page.getByTestId('email-input')).toHaveValue('john.doe@example.com')
    await expect(page.getByTestId('phone-input')).toHaveValue('(233) 99-999-9999')
    await expect(page.getByTestId('role-professional').getByRole('radio')).toBeChecked()
  })

  test('should show validation errors with invalid data', async ({ page }) => {
    // Submit the form without filling any data
    await page.getByTestId('submit-button').click()

    // Verify that error messages are visible for required fields
    await expect(page.getByTestId('firstName-error')).toBeVisible()
    await expect(page.getByTestId('lastName-error')).toBeVisible()
    await expect(page.getByTestId('email-error')).toBeVisible()
    await expect(page.getByTestId('phone-error')).toBeVisible()
    await expect(page.getByTestId('password-error')).toBeVisible()
    await expect(page.getByTestId('confirmPassword-error')).toBeVisible()
    await expect(page.getByTestId('role-error')).toBeVisible()
  })

  test('should show password mismatch error', async ({ page }) => {
    // Fill in the form with mismatched passwords
    await page.getByTestId('firstName-input').fill('John')
    await page.getByTestId('lastName-input').fill('Doe')
    await page.getByTestId('email-input').fill('john.doe@example.com')
    await page.getByTestId('phone-input').fill('(233) 99-999-9999')
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
