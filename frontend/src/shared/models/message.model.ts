interface IMessage {
  id: string
  senderId: string
  receiverId: string
  content: string
  status: 'sent' | 'delivered' | 'read' | 'failed'
  timestamp: string
}

class Message implements IMessage {
  id: string
  senderId: string
  receiverId: string
  content: string
  status: 'sent' | 'delivered' | 'read' | 'failed'
  timestamp: string

  constructor(
    id: string,
    senderId: string,
    receiverId: string,
    content: string,
    status: 'sent' | 'delivered' | 'read' | 'failed' = 'sent',
  ) {
    this.id = id
    this.senderId = senderId
    this.receiverId = receiverId
    this.content = content
    this.status = status
    this.timestamp = new Date().toISOString()
  }

  markAsDelivered(): void {
    this.status = 'delivered'
  }

  markAsRead(): void {
    this.status = 'read'
  }

  toJSON(): IMessage {
    return {
      id: this.id,
      senderId: this.senderId,
      receiverId: this.receiverId,
      content: this.content,
      status: this.status,
      timestamp: this.timestamp,
    }
  }
}
