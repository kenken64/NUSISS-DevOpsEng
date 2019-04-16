describe('app', () => {
    beforeEach(async () => {
      await page.goto('http://54.169.29.207:3000/')
    })
  
    it('should display a PopQuiz heading', async () => {
      await expect(page).toMatch('PopQuiz')
    })
  })