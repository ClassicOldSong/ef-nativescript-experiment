import * as NSCore from '@nativescript/core';
// eslint-disable-next-line no-duplicate-imports
import { Application, ObservableArray } from '@nativescript/core';
import { android } from '@nativescript/core/application';
import { isAndroid, isIOS } from '@nativescript/core/platform';
import { domImpl, document } from 'dominative';
import { setDOMImpl } from 'ef-core';

import App from './app.eft';
import Label from './label.eft';
import BarItem from './baritem.eft';

setDOMImpl(domImpl);

Application.run({
  create: () => {
    const app = new App({
      $data: {
        listItems: new ObservableArray([
          {
            text: 'wow',
          },
        ]),
      },
      $methods: {
        reset() {
          if (isAndroid) {
            const activity = android.foregroundActivity;
            const intent = activity.getIntent();

            activity.finish();
            android.context.startActivity(intent);
          } else if (isIOS) {
            // eslint-disable-next-line no-undef
            exit(0);
          }
        },
        increment({ state }) {
          state.$data.count += 1;
        },
        addView({ state }) {
          const newView = new Label({
            $data: {
              text: state.$data.name,
            },
          });

          state.views.push(newView);
        },
        removeView({ state }) {
          state.views.pop();
        },
        addBarItem({ state }) {
          state.barItems.push(
            new BarItem({ $data: { title: state.$data.name } })
          );
          state.propedBarItems.push(
            new BarItem({ $data: { title: state.$data.name } })
          );
          state.$data.sliderMaxValue = state.barItems.length + 2;
        },
        removeBarItem({ state }) {
          state.barItems.pop();
          state.propedBarItems.pop();
          state.$data.sliderMaxValue = state.barItems.length + 2;
        },
        backToA({ state }) {
          state.$data.tabSelectedIndex = 0;
        },
        addList({ state }) {
          state.$data.listItems.push({
            text: state.$data.name,
          });
        },
        removeList({ state }) {
          state.$data.listItems.pop();
        },
        refreshList({ state }) {
          state.$refs.listView.refresh();
        },
        createListItem({ event }) {
          const label = new Label();
          event.view = label.$refs.root;
          event.view.__efModel = label;
        },
        loadListItem({ event }) {
          const { view, index, item } = event;
          event.patched = true;

          const label = view.__efModel;

          label.$data.text = `${index}, ${
            item.text
          }, some random number: ${Math.round(Math.random() * 20)}`;
        },
      },
    });

    setInterval(() => {
      app.$data.time = new Date().toLocaleTimeString();
    }, 1000);

    global.app = app;
    return app.$refs.root;
  },
});

global.NSCore = NSCore;
global.document = document;
