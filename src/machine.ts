import { createActorContext } from "@xstate/react";
import { LngLat, MapInstance } from "react-map-gl/maplibre";
import { assertEvent, assign, createMachine } from "xstate";
import { Rectangle } from "./DrawingProvider";

interface Context {
  mapInstance: MapInstance | null;
  startPoint: LngLat | null;
  rectangle: Rectangle | null;
}

// Use the types in the setup function
const machine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QFsCGBjAFgSwHZgDoAFVGAAm1jOQHsBXXAFzygGIwA3MJhNABwQAbGqggBtAAwBdRKD41Y2ZjVyyQAD0QAmLRIIAOACwBOAKwB2Haf0BmQzeP6ANCACeiawXMA2e1pum3lr63raBAL7hLmhYeIQAsqh8FFTYEIJg7Fw8EABOqADuCLCMqLmMkjJIIPKKyqrVmgi+WgSmhkEddloAjKYBLu4I+j0Ehv09WmbeQT2G5j2R0Rg4+AQAyqXlZPJ4jGQFqFSwYIxZ3Iy8Sbz0JzdclWq1Stgqak09EjbeBA42veZzBIjB0tINEN9jAZdMZvJ9eqEesYliAYqtCJsyvtdkwDkcyCczpwLlcBOhBNh0ABrR7VZ71d6IfSeGzM3qmYyw+y2cEIcamX7WEbGEzeQJfGwotFxAgAVROuRSZDyhRY5x4-AQ5MpNOkTwULzejSZcN+cK+uh0M1MvL6AuMgMcxi0hhMWn6kSiIFwNAgcDU0vw+rqrwaoCaAFpDK1zPpjD1Y-o48YJG7eRHgmMdLCegFAaF-FKVjKSORKNR6EwWMHDWGNB4CL1gb0ep8JGZmza3EzRj19JYkxIFlNvDZFl7Awkkkq0hkawzjXygW19DoJMEzGPxryRgQ+wP9EPJrCx0XYmtMdscftDsdTvPQ4zhqbJj5Y-NTJNerybBIBf3vAWVkgV0QDDDPdE5QVJUVQKas6QNBdwyZcwbEbbwT1jBxTGBcwd17ftgkPYcT3HSIgA */
    id: "machine",
    context: {
      mapInstance: null,
      startPoint: null,
      rectangle: null,
    },
    types: {
      context: {} as Context,
      events: {} as
        | { type: "event:map:load"; mapInstance: MapInstance }
        | { type: "event:draw:start" }
        | {
            type: "event:map:click";
            lngLat: LngLat;
          }
        | {
            type: "event:map:mouse:move";
            lngLat: LngLat;
          },
    },
    initial: "Page is mounting",
    states: {
      "Page is mounting": {
        on: {
          "event:map:load": {
            target: "Map is idle",
            actions: "action:setMapInstance",
          },
        },
      },

      "Map is idle": {
        on: {
          "event:draw:start": "User is drawing",
        },
      },

      "Start point was set": {
        on: {
          "event:map:mouse:move": {
            target: "Start point was set",
            actions: "action:setRectangle",
          },

          "event:map:click": {
            target: "Map is idle",
            reenter: true,
            actions: "actions:setRectangle",
          },
        },
      },

      "User is drawing": {
        on: {
          "event:map:click": {
            target: "Start point was set",
            reenter: true,
            actions: "action:setStartPoint",
          },
        },
      },
    },
  },
  {
    actions: {
      "action:setMapInstance": assign(({ context, event }) => {
        assertEvent(event, "event:map:load");
        return {
          ...context,
          mapInstance: event.mapInstance,
        };
      }),
      "action:setStartPoint": assign(({ context, event }) => {
        assertEvent(event, "event:map:click");
        return {
          ...context,
          startPoint: event.lngLat,
        };
      }),
      "action:setRectangle": assign(({ context, event }) => {
        assertEvent(event, ["event:map:mouse:move", "event:map:click"]);

        if (!context.startPoint) {
          throw new Error("Start point not set");
        }

        return {
          ...context,
          rectangle: [context.startPoint, event.lngLat] as Rectangle,
        };
      }),
    },
  }
);

export const MachineContext = createActorContext(machine);
