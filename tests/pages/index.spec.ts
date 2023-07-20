import { afterAll, beforeAll, describe, expect, test } from 'vitest'
import puppeteer from 'puppeteer'
import type { Browser, Page } from 'puppeteer'
import { getServer, serverUrl } from '../__utils__/server'
import { Server } from 'node:http'

describe('basic', async () => {
  let server: Server
  let browser: Browser
  let page: Page

  beforeAll(async () => {
    server = getServer()
    browser = await puppeteer.launch({ headless: 'new' })
    page = await browser.newPage()
  })

  afterAll(async () => {
    await browser.close()
    await new Promise<void>((resolve, reject) => {
      server.closeAllConnections()
      server.close(error => error ? reject(error) : resolve())
    })
  })

  test('should run javascript', async () => {
      await page.goto(serverUrl())
      const button = (await page.$('button'))!
      expect(button).toBeTruthy()

      let text = await page.evaluate(btn => btn?.textContent, button)
      expect(text).toBe('Clicked 0 time(s)')

      await button.click()
      text = await page.evaluate(btn => btn.textContent, button)
      expect(text).toBe('Clicked 1 time(s)')
  }, 60_000)

  test('should redirect', async () => {
    await page.goto(serverUrl('/descontos'))
    expect(page.url()).not.toBe(serverUrl('/descontos'))
    expect(page.url()).toBe(serverUrl('/forbidden'))
  })

  test('shound apply style', async () => {
    await page.goto(serverUrl());
    const button = (await page.$('button'))!

    const styles = await page.evaluate(btn => {
      return JSON.parse(JSON.stringify(getComputedStyle(btn)))
    }, button);


    expect(styles.backgroundColor).toBe('rgb(16, 149, 193)')
  })
})