import { HttpClientModule } from "@angular/common/http";
import { importProvidersFrom } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { applicationConfig } from "@storybook/angular";
import { RoutingServiceMock } from "../src/app/_services/routing.mock.service";
import { RoutingService } from "../src/app/_services/routing.service";

export const parameters = {
  viewMode: "docs",
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  docs: {
    inlineStories: true, // forces full height of component in docs
  },
  storySort: {
    method: "alphabetical",
    order: [
      "Introduction",
      "Styleguide",
      "Atoms",
      ["README", "MOCK", "*"],
      "Molecules",
      ["README", "MOCK", "*"],
      "Organisms",
      ["README", "MOCK", "*"],
    ],
    locales: "en-US",
  },
  backgrounds: {
    default: "white",
    values: [
      { name: "grey", value: "#666666" },
      { name: "white", value: "#fff" },
      { name: "black", value: "#000" },
    ],
  },
};

const decorators = [
  applicationConfig({
    imports: [BrowserAnimationsModule],
    providers: [
      importProvidersFrom(HttpClientModule),
      {
        provide: RoutingService,
        useClass: RoutingServiceMock,
      },
    ], // Imports httpclient module globally, needed for overview things in formly
  }),
];

const preview = {
  parameters: parameters,
  decorators: decorators,
  tags: ["autodocs"],
};

export default preview;
