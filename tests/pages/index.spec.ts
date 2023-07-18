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
      server.close(error => error ? reject(error) : resolve())
    })
  })

  // TODO make more stable
  test('should have the correct title', async () => {
      await page.goto(serverUrl(), { waitUntil: 'domcontentloaded' })
      const button = (await page.$('button'))!
      expect(button).toBeTruthy()

      let text = await page.evaluate(btn => btn?.textContent, button)
      expect(text).toBe('Clicked 0 time(s)')

      await button.click()
      text = await page.evaluate(btn => btn.textContent, button)
      expect(text).toBe('Clicked 1 time(s)')
  }, 60_000)
})