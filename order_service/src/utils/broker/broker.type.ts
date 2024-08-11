
export type MessageBroker = {
  // Producer
  connectProducer: <T>() => Promise<T>
  disconnectProducer: () => Promise<void>
  publish: (record: unknown) => Promise<boolean>

  // consumer
  connectConsumer: <T>  () => Promise<T>
  disconnectConsumer: <T>  () => Promise<T>
  subscribe: <T> (messageHandler: Function, topic: string) => Promise<void>
}