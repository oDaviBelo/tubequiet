import { createRoot } from 'react-dom/client';
import Cookies from 'js-cookie';

import './index.css';
import { useEffect, useState } from 'react';
export const App = () => {
  const [isFeedOn, setIsFeedOn] = useState(false);
  const [isShortsOn, setIsShortsOn] = useState(false);
  const [isCommentsOn, setIsCommentsOn] = useState(false);
  const [isSidebarOn, setIsSidebarOn] = useState(false);
  const [IsModeFocusOn, setIsModeFocusOn] = useState(false);

  useEffect(() => {
    const savedFeedState = Cookies.get('isFeedOn');
    if (savedFeedState) {
      setIsFeedOn(savedFeedState === 'true');
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const tabId = tabs[0]?.id;
        if (tabId !== undefined) {
          chrome.tabs.sendMessage(tabId, {
            type: 'TOGGLE_FEED',
            value: savedFeedState,
          });
        }
      });
    }
  }, []);

  useEffect(() => {
    Cookies.set('isFeedOn', isFeedOn.toString());
  }, [isFeedOn]);

  useEffect(() => {
    const savedShortsState = Cookies.get('isShortsOn');
    if (savedShortsState) {
      setIsShortsOn(savedShortsState === 'true');
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const tabId = tabs[0]?.id;
        if (tabId !== undefined) {
          chrome.tabs.sendMessage(tabId, {
            type: 'TOGGLE_SHORTS',
            value: savedShortsState,
          });
        }
      });
    }
  }, []);

  useEffect(() => {
    Cookies.set('isShortsOn', isShortsOn.toString());
  }, [isShortsOn]);

  useEffect(() => {
    const savedCommentsState = Cookies.get('isCommentsOn');
    if (savedCommentsState) {
      setIsCommentsOn(savedCommentsState === 'true');
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const tabId = tabs[0]?.id;
        if (tabId !== undefined) {
          chrome.tabs.sendMessage(tabId, {
            type: 'TOGGLE_COMMENTS',
            value: savedCommentsState,
          });
        }
      });
    }
  }, []);

  useEffect(() => {
    Cookies.set('isCommentsOn', isCommentsOn.toString());
  }, [isCommentsOn]);

  useEffect(() => {
    const savedSidebarState = Cookies.get('isSidebarOn');
    if (savedSidebarState) {
      setIsSidebarOn(savedSidebarState === 'true');
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const tabId = tabs[0]?.id;
        if (tabId !== undefined) {
          chrome.tabs.sendMessage(tabId, {
            type: 'TOGGLE_SIDEBAR',
            value: savedSidebarState,
          });
        }
      });
    }
  }, []);

  useEffect(() => {
    Cookies.set('isSidebarOn', isSidebarOn.toString());
  }, [isSidebarOn]);

  useEffect(() => {
    const savedModeFocusState = Cookies.get('IsModeFocusOn');
    if (savedModeFocusState) {
      setIsModeFocusOn(savedModeFocusState === 'true');
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const tabId = tabs[0]?.id;
        if (tabId !== undefined) {
          chrome.tabs.sendMessage(tabId, {
            type: 'TOGGLE_MODEFOCUS',
            value: savedModeFocusState,
          });
        }
      });
    }
  }, []);

  useEffect(() => {
    Cookies.set('IsModeFocusOn', IsModeFocusOn.toString());
  }, [IsModeFocusOn]);

  const handleFeed = () => {
    const newValue = !isFeedOn;
    setIsFeedOn(newValue);
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tabId = tabs[0]?.id;
      if (tabId !== undefined) {
        chrome.tabs.sendMessage(tabId, {
          type: 'TOGGLE_FEED',
          value: newValue,
        });
      }
    });
  };

  const handleShorts = () => {
    const newValue = !isShortsOn;
    setIsShortsOn(newValue);
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tabId = tabs[0]?.id;
      if (tabId !== undefined) {
        chrome.tabs.sendMessage(tabId, {
          type: 'TOGGLE_SHORTS',
          value: newValue,
        });
      }
    });
  };

  const handleComments = () => {
    const newValue = !isCommentsOn;
    setIsCommentsOn(newValue);
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tabId = tabs[0]?.id;
      if (tabId !== undefined) {
        chrome.tabs.sendMessage(tabId, {
          type: 'TOGGLE_COMMENTS',
          value: newValue,
        });
      }
    });
  };

  const handleSidebar = () => {
    const newValue = !isSidebarOn;
    setIsSidebarOn(newValue);

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tabId = tabs[0]?.id;
      if (tabId !== undefined) {
        chrome.tabs.sendMessage(tabId, {
          type: 'TOGGLE_SIDEBAR',
          value: newValue,
        });
      }
    });
  };

  const handleModeFocus = () => {
    const newValue = !IsModeFocusOn;
    setIsModeFocusOn(newValue);

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tabId = tabs[0]?.id;
      if (tabId !== undefined) {
        chrome.tabs.sendMessage(tabId, {
          type: 'TOGGLE_MODEFOCUS',
          value: newValue,
        });
      }
    });
  };
  return (
    <>
      <div className="" id="popup">
        <h1 className="">TubeQuiet: Eliminate distractions, use the essential</h1>
        <div>
          <input type="checkbox" onChange={handleFeed} checked={isFeedOn} value="Feed" />
          <label htmlFor="Feed">Block Feed</label>
        </div>
        <div>
          <input type="checkbox" onChange={handleShorts} checked={isShortsOn} value="Shorts" />
          <label htmlFor="Shorts">Block Shorts</label>
        </div>
        <div>
          <input
            type="checkbox"
            onChange={handleComments}
            checked={isCommentsOn}
            value="Comments"
          />
          <label htmlFor="Comments">Block Comments</label>
        </div>
        <div>
          <input type="checkbox" onChange={handleSidebar} checked={isSidebarOn} value="Sidebar" />
          <label htmlFor="Sidebar">Block Sidebar</label>
        </div>
        <div>
          <input
            type="checkbox"
            onChange={handleModeFocus}
            checked={IsModeFocusOn}
            value="ModeFocus"
          />
          <label htmlFor="ModeFocus">Mode Focus</label>
        </div>
      </div>
    </>
  );
};

const root = createRoot(document.getElementById('root')!);
root.render(<App />);
