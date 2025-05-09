/**
 * Configures your project to generate an app-shell during build time.
 */
export type Schema = {
    /**
     * The name of the project where the app-shell should be generated.
     */
    project: string;
    /**
     * Set up a server application using the Server Routing and App Engine APIs (Developer
     * Preview).
     */
    serverRouting?: boolean;
};
