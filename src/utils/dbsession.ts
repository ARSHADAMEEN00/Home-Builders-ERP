import { ClientSession, startSession } from 'mongoose';

class MongoSessionManager {
  private session: ClientSession | null = null;

  // Start a new MongoDB session
  public async startNewSession(): Promise<ClientSession> {
    if (!this.session) {
      this.session = await startSession();
      console.log('MongoDB session started');
    }
    return this.session;
  }

  // Commit the current transaction
  public async commitTransaction(): Promise<void> {
    if (this.session) {
      await this.session.commitTransaction();
      console.log('Transaction committed');
    } else {
      throw new Error('No active session found');
    }
  }

  // Abort the current transaction
  public async abortTransaction(): Promise<void> {
    if (this.session) {
      await this.session.abortTransaction();
      console.log('Transaction aborted');
    } else {
      throw new Error('No active session found');
    }
  }

  // End the current session
  public endSession(): void {
    if (this.session) {
      this.session.endSession();
      console.log('Session ended');
      this.session = null;
    } else {
      throw new Error('No active session to end');
    }
  }
}

// Export an instance of MongoSessionManager
const mongoSessionManager = new MongoSessionManager();
export { mongoSessionManager };
