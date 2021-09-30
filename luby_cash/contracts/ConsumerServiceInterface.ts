export default interface ConsumerServiceInterface {
  execute: (topic: string, fromBeginning: boolean) => Promise<void>
}
