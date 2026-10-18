import conf from '../conf/conf.js'
import { Client, Account, ID } from 'appwrite'

export class AuthService {
  client = new Client()
  account

  constructor() {
    this.client.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProjectId)
    this.account = new Account(this.client)
  }

  async createAccount({ email, password, name }) {
    await this.account.create(ID.unique(), email, password, name.trim())
    return this.login({ email, password })
  }

  async login({ email, password }) {
    return this.account.createEmailPasswordSession(email, password)
  }

  async getCurrentUser() {
    try { return await this.account.get() }
    catch { return null }
  }

  async Logout() {
    return this.account.deleteSession('current')
  }
}

const authService = new AuthService()
export default authService
