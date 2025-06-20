const { clipboard } = require('electron');

// 为每个实例生成唯一ID
const instanceId = 'editor_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
console.log('创建新的编辑器实例:', instanceId);

// 将实例ID暴露给主页面
window.editorInstanceId = instanceId;

// 导出给主页面使用的功能
window.exports = {
  // 处理选中文本的功能
  "format-selected": {
    mode: "none",
    args: {
      enter: (action) => {
        console.log('通过选中文本启动插件，action:', action);
        
        // 获取选中的文本
        const content = action.payload || '';
        console.log('选中的文本内容:', content);
        
        // 将内容传递给主页面（使用实例ID隔离）
        window[instanceId + '_selectedContent'] = content;
        window.selectedContent = content; // 保持兼容性
        
        // 显示通知
        if (content) {
          utools.showNotification(`已获取选中文本，共${content.length}字符`);
        }
        
        // 打开主界面
        utools.showMainWindow();
        utools.setExpendHeight(600);
      }
    }
  },
  
  // 处理关键词启动的功能
  "editor-format": {
    mode: "none",
    args: {
      enter: (action) => {
        console.log('通过关键词启动插件，action:', action);
        
        let content = '';
        
        // 尝试从剪贴板获取内容
        try {
          content = clipboard.readText() || '';
          console.log('从剪贴板获取内容:', content);
        } catch (error) {
          console.log('无法读取剪贴板内容:', error);
          content = '';
        }
        
        // 将内容传递给主页面（使用实例ID隔离）
        window[instanceId + '_selectedContent'] = content;
        window.selectedContent = content; // 保持兼容性
        
        // 显示通知
        if (content) {
          utools.showNotification(`已加载剪贴板内容，共${content.length}字符`);
        }
        
        // 打开主界面
        utools.showMainWindow();
        utools.setExpendHeight(600);
      }
    }
  },
  
  // 处理鼠标中键快速启动的功能
  "quick-editor": {
    mode: "none",
    args: {
      enter: (action) => {
        console.log('快速编辑器启动，action:', action);
        
        let content = '';
        let contentSource = '';
        
        // 检查是否是通过选中文本启动（regex匹配）
        if (action && action.type === 'regex' && action.payload && typeof action.payload === 'string' && action.payload.trim()) {
          content = action.payload;
          contentSource = '选中文本';
          console.log('获取到选中文本:', content.substring(0, 100));
        }
        // 检查是否是通过over类型启动（鼠标中键），尝试从剪贴板获取
        else if (action && action.type === 'over') {
          try {
            content = clipboard.readText() || '';
            contentSource = '剪贴板';
            console.log('从剪贴板获取内容:', content.substring(0, 100));
          } catch (error) {
            console.log('无法读取剪贴板内容:', error);
            content = '';
            contentSource = '无';
          }
        }
        // 其他情况，尝试从剪贴板获取
        else {
          try {
            content = clipboard.readText() || '';
            contentSource = '剪贴板';
            console.log('默认从剪贴板获取内容:', content.substring(0, 100));
          } catch (error) {
            console.log('无法读取剪贴板内容:', error);
            content = '';
            contentSource = '无';
          }
        }
        
        // 将内容传递给主页面（使用实例ID隔离）
        window[instanceId + '_selectedContent'] = content;
        window.selectedContent = content; // 保持兼容性
        
        // 显示通知
        if (content) {
          utools.showNotification(`快速编辑器已启动，已加载${contentSource}内容，共${content.length}字符`);
        } else {
          utools.showNotification('快速编辑器已启动（无内容）');
        }
        
        // 打开主界面
        utools.showMainWindow();
        utools.setExpendHeight(600);
      }
    }
  },
  
  // 处理多标签编辑器的功能
  "multi-editor": {
    mode: "none",
    args: {
      enter: (action) => {
        console.log('多标签编辑器启动，action:', action);
        
        let content = '';
        
        // 尝试从剪贴板获取内容
        try {
          content = clipboard.readText() || '';
          console.log('多标签编辑器从剪贴板获取内容:', content.substring(0, 100));
        } catch (error) {
          console.log('无法读取剪贴板内容:', error);
          content = '';
        }
        
        // 将内容传递给主页面（使用实例ID隔离）
        window[instanceId + '_selectedContent'] = content;
        window.selectedContent = content; // 保持兼容性
        
        // 标记使用多标签模式
        window[instanceId + '_useMultiTab'] = true;
        window.useMultiTab = true;
        
        // 显示通知
        utools.showNotification('多标签编辑器已启动');
        
        // 打开主界面
        utools.showMainWindow();
        utools.setExpendHeight(600);
      }
    }
  }
};

// 插件窗口相关事件处理
window.utools = window.utools || {};

// 当插件准备显示时
utools.onPluginReady(() => {
  console.log('Editor Format 插件已准备就绪');
});

// 当插件进入时
utools.onPluginEnter((action) => {
  console.log(`插件进入，实例${instanceId}，action:`, action);
  
  // 检查是否已有实例运行，如果有，创建新的浮动窗口
  const existingInstances = window.editorInstances || [];
  
  // 存储action信息供主页面使用（使用实例ID隔离）
  window[instanceId + '_pluginAction'] = action;
  window.pluginAction = action; // 保持兼容性
  
  // 强制处理选中内容和剪贴板内容
  let content = '';
  
  // 如果是regex类型（选中文本），优先使用选中内容
  if (action && action.type === 'regex' && action.payload) {
    content = action.payload;
    console.log(`实例${instanceId}：获取到选中文本:`, content.substring(0, 100));
    
    // 如果是新的选中内容且与当前内容不同，强制更新
    const currentContent = window.selectedContent || '';
    if (content !== currentContent) {
      console.log(`实例${instanceId}：检测到新的选中内容，强制更新`);
      // 设置一个标记，表示需要强制更新
      window[instanceId + '_forceUpdate'] = true;
    }
  }
  // 否则尝试从剪贴板获取
  else {
    try {
      content = clipboard.readText() || '';
      console.log(`实例${instanceId}：从剪贴板获取内容:`, content.substring(0, 100));
    } catch (error) {
      console.log('无法读取剪贴板:', error);
    }
  }
  
  // 设置内容到实例变量
  window[instanceId + '_selectedContent'] = content;
  window.selectedContent = content; // 保持兼容性
  
  // 记录当前实例
  if (!window.editorInstances) {
    window.editorInstances = [];
  }
  if (!window.editorInstances.includes(instanceId)) {
    window.editorInstances.push(instanceId);
  }
  
  // 通知主页面内容已更新
  setTimeout(() => {
    if (window.updateEditorContent) {
      window.updateEditorContent(content);
    }
    
    // 如果需要强制更新，直接调用
    if (window[instanceId + '_forceUpdate']) {
      console.log(`实例${instanceId}：执行强制更新`);
      window[instanceId + '_forceUpdate'] = false;
      if (window.editorInstance) {
        window.editorInstance.setValue(content);
        if (content) {
          // 自动检测语言并格式化
          if (window.detectAndSetLanguage) {
            window.detectAndSetLanguage(content, true);
          }
        }
      }
    }
  }, 100);
});

// 当插件分离时
utools.onPluginDetach(() => {
  console.log(`插件已分离，实例${instanceId}`);
  // 清理当前实例的全局变量
  delete window[instanceId + '_selectedContent'];
  delete window[instanceId + '_pluginAction'];
  // 只清理属于当前实例的通用变量
  if (window.editorInstanceId === instanceId) {
    delete window.selectedContent;
    delete window.pluginAction;
  }
});

// 提供给主页面的工具函数
window.utoolsHelper = {
  // 获取当前实例的ID
  getInstanceId: () => {
    return instanceId;
  },
  
  // 获取选中的内容（优先使用实例隔离的数据）
  getSelectedContent: () => {
    return window[instanceId + '_selectedContent'] || window.selectedContent || '';
  },
  
  // 获取剪贴板内容
  getClipboardContent: () => {
    try {
      return clipboard.readText() || '';
    } catch (error) {
      console.log('读取剪贴板失败:', error);
      return '';
    }
  },
  
  // 设置剪贴板内容
  setClipboardContent: (text) => {
    try {
      clipboard.writeText(text);
      return true;
    } catch (error) {
      console.log('写入剪贴板失败:', error);
      return false;
    }
  },
  
  // 显示通知
  showNotification: (message) => {
    if (utools && utools.showNotification) {
      utools.showNotification(message);
    }
  },
  
  // 隐藏窗口
  hideWindow: () => {
    if (utools && utools.hideMainWindow) {
      utools.hideMainWindow();
    }
  },
  
  // 获取当前action信息（优先使用实例隔离的数据）
  getCurrentAction: () => {
    return window[instanceId + '_pluginAction'] || window.pluginAction || null;
  }
}; 