type Message =
  | { type: 'TOGGLE_FEED'; value: boolean }
  | { type: 'TOGGLE_SHORTS'; value: boolean }
  | { type: 'TOGGLE_COMMENTS'; value: boolean }
  | { type: 'TOGGLE_SIDEBAR'; value: boolean }
  | { type: 'TOGGLE_MODEFOCUS'; value: boolean };

chrome.runtime.onMessage.addListener((msg: Message) => {
  if (msg.type === 'TOGGLE_FEED') {
    deleteFeed(msg);
  } else if (msg.type === 'TOGGLE_SHORTS') {
    deleteShorts(msg);
  } else if (msg.type === 'TOGGLE_COMMENTS') {
    deleteComments(msg);
  } else if (msg.type === 'TOGGLE_SIDEBAR') {
    deleteSidebar(msg);
  } else if (msg.type === 'TOGGLE_MODEFOCUS') {
    deleteFeed(msg);
    deleteShorts(msg);
    deleteComments(msg);
    deleteSidebar(msg);
    deleteHeader(msg);
  }
});

const deleteFeed = (msg: Message) => {
  const feed = document.querySelector('#contents');
  const recommendations = document.querySelector('#scroll-container');

  console.log(feed);
  if (feed instanceof HTMLElement && recommendations instanceof HTMLElement) {
    console.log(msg.value);
    feed.style.display = msg.value ? 'none' : '';
    feed.style.position = msg.value ? 'relative' : '';
    feed.style.zIndex = msg.value ? '1' : '';
    recommendations.style.display = msg.value ? 'none' : '';
  }
};

const deleteShorts = (msg: Message) => {
  const shorts = document.getElementsByTagName('ytd-guide-entry-renderer')[1];
  const feedShorts = document.getElementsByTagName('ytd-rich-shelf-renderer');
  for (let i = 0; i < feedShorts.length; i++) {
    const item = feedShorts[i];
    if (item instanceof HTMLElement) {
      item.style.display = 'none';
    }
  }
  console.log(shorts);
  if (shorts instanceof HTMLElement) {
    console.log(msg.value);
    shorts.style.display = msg.value ? 'none' : '';
  }
};

const deleteComments = (msg: Message) => {
  const comments = document.querySelector('#comments');
  if (comments instanceof HTMLElement) {
    comments.style.display = msg.value ? 'none' : '';
  }
};

const deleteSidebar = (msg: Message) => {
  const sidebar = document.querySelector('#guide');
  console.log(sidebar);
  if (sidebar instanceof HTMLElement) {
    console.log(msg.value);
    sidebar.style.display = msg.value ? 'none' : '';
  }
};

const deleteHeader = (msg: Message) => {
  const headerStart = document.querySelector('#start');
  const headerEnd = document.querySelector('#end');
  const headerCenter = document.querySelector('#center');

  if (
    headerStart instanceof HTMLElement &&
    headerEnd instanceof HTMLElement &&
    headerCenter instanceof HTMLElement &&
    window.location.pathname === '/'
  ) {
    headerStart.style.display = msg.value ? 'none' : '';
    headerEnd.style.display = msg.value ? 'none' : '';
    headerCenter.style.position = msg.value ? 'relative' : '';
    headerCenter.style.zIndex = msg.value ? '0' : '';
    headerCenter.style.marginTop = msg.value ? '50%' : '';
    headerCenter.style.marginLeft = msg.value ? '50%' : '';
    headerCenter.style.transform = msg.value ? 'translate(-50%,-50%)' : '';
    headerCenter.style.width = msg.value ? 'auto' : '';
  }
};

document.addEventListener('mousemove', () => {
  const headerCenter = document.querySelector('#center');

  if (window.location.pathname !== '/') {
    const shortsResults = document.getElementsByTagName('grid-shelf-view-model');
    const recommendationsPlayer = document.querySelector('#secondary-inner');

    if (recommendationsPlayer instanceof HTMLElement) {
      recommendationsPlayer.style.display = 'none';
    }

    if (headerCenter instanceof HTMLElement) {
      headerCenter.style.display = 'none';
    }
    for (let i = 0; i < shortsResults.length; i++) {
      const shortsItem = shortsResults[i];
      if (shortsItem instanceof HTMLElement) shortsItem.style.display = 'none';
    }
  } else {
    if (headerCenter instanceof HTMLElement) {
      headerCenter.style.display = '';
    }
  }
});
