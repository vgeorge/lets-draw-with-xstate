import { createActorContext } from "@xstate/react";
import { MapInstance } from "react-map-gl/maplibre";
import { assertEvent, assign, createMachine } from "xstate";

interface Context {
  mapInstance: MapInstance | null;
}

// Use the types in the setup function
const machine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QFsCGBjAFgSwHZgDoAFVGAAm1jOQHsBXXAFzygGIwA3MJhNABwQAbGqggBtAAwBdRKD41Y2ZjVyyQAD0QAmLRIIBOAGxbDADgAsEiVv0BGAKzmANCACeiU7YKGJ52wHYHCVM7Q3N7AF8IlzQsPEIAWVQ+CipsCEEwVgBBXBpGTDAAJzJObkZJGSQQeUVlVWr3BE8CW1N-LVNTCUCbQwBmWxdNBA79Ant9e3bzf38JQfCo6JA8iDg1WJx8NVqlbBU1EYBaQxcm04Ira4DzfqN-Q1tDKJiMbcISckpqeiYWXYKfaHaojcxac6IWy+CZaQL9fz9cK2Gx3V4gLbxAhJFI-dKZQF1A4NUBg+YTUw6awheyLeyQ5peNodLo9FFGQbozH4Aj4ADuZFgjFQjDAZFshOBJI0iHM3Sucv6tP89nsA1MZzc2nseiV+k84Ms0xM5mWESAA */
    id: "machine",
    context: {
      mapInstance: null,
    },
    types: {
      context: {} as Context,
      events: {} as { type: "event:map:load"; mapInstance: MapInstance },
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
        entry: (context) => {
          console.log(context);
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
    },
  }
);

export const MachineContext = createActorContext(machine);
