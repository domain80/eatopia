import type { JwtPayload } from 'jwt-decode'

export interface JwtCustomPayload extends JwtPayload {
  isNewUser: boolean
  roles: string[]
}
