describe('app', () => {
    beforeEach(async () => {
      await page.goto('http://54.169.29.207:3000/')
    })
  
    it('should display a PopQuiz heading', async () => {
      await page.screenshot({path: 'test/screenshots/mainpage.png'});
      await expect(page).toMatch('PopQuiz')
    })

    it('click manage pop quiz ', async () => {
      await expect(page).toClick('a', { text: 'Manage Pop Quizes' })
    })

    it('should display first record', async () => {
      await page.goto('http://54.169.29.207:3000/list-quizes')
      await page.screenshot({path: 'test/screenshots/listofquizes.png'});
      await expect(page).toMatch('What is an object?')
    })
   
    it('add a new pop quiz', async () => {
      await page.goto('http://54.169.29.207:3000/show-newQuizform')
      await expect(page).toFillForm('form[name="addNewQuiz"]', {
        question: 'What is your name?',
        answer1: 'Kenneth',
        answer2: 'Kelvin',
        answer3: 'Louis',
        answer4: 'Max',
        correctAnswer: 'Kenneth'
      })
      await expect(page).toClick('button', { text: 'Submit' })
    })
    
    it('list all pop quizes after adding', async () => {
      await page.goto('http://54.169.29.207:3000/list-quizes')
      await page.screenshot({path: 'test/screenshots/newquiz.png'});
      await expect(page).toMatch('What is your name')
    })

  
  })