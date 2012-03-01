

/**
 * @name FE.ui.service.module
 * @namespace
 */
jQuery.namespace("FE.ui.service.module");


(function($,M){
	
	/**
	 * 面包屑式导航条
	 * @author bruce.liz
	 * @constructor
	 * @name FE.ui.service.module.NavCrumb
	 * @param {Object} options 可设置的参数（见Configuration Summary）
	 * @requires jQuery
	 * @example
	 *     new FE.ui.service.module.NavCrumb({
	 *         container:"#containerId",//菜单容器
	 *         itemSelector:"> li"//item项css选择器
	 *     });
	 */
	M.NavCrumb = function(options){
		  this.init(options);
	};

	M.NavCrumb.prototype={
			/**@scope FE.ui.service.module.NavCrumb#*/
			
			/**
			 * 父容器jquery对象
			 * @type jQueryObject
			 */
			ct:null,
			
			/**
			 * 菜单项jquery对象
			 * @type jQueryObject
			 */
			items:null,
			
			_dateKey_ : "navcrumb",
			
		initOptions:function(options){
			/**@scope FE.ui.service.module.NavCrumb#*/
			var defaultOptions={
					/**@scope FE.ui.service.module.NavCrumb#*/
				
					/**#@+
					 *@cfg 
					 */

					/**
					 * 组件容器css selector
					 * @type String
					 */
					container:"#s-crumb",

					/**
					 * 组件子项css selector
					 * @type String
					 */
					itemSelector:"> li",
					
					/**
					 * hover事件名
					 * @type String
					 * @default "mouseenter"
					 * @optional
					 */
					hoverEvent:"mouseenter",

					/**
					 * unhover事件名
					 * @type String
					 * @default "mouseleave"
					 * @optional
					 */
					unhoverEvent:"mouseleave",
					
					/**
					 * 选中项标识css名
					 * @type String
					 * @default "current"
					 * @optional
					 */
					selectedCls:"current",
					
					/**
					 * 默认选中项css
					 * @type String
					 * @default "current-default"
					 * @optional
					 */
					defaultSelectedCls:"current-default",
					
					/**
					 * hover默认选中项css
					 * @type String
					 * @default "current-hover"
					 * @optional
					 */
					hoverSelectedCls:"current-hover",
					
					/**
					 * hover项之前默认选中项css
					 * @type String
					 * @default "current-prefix"
					 * @optional
					 */
					prefixSelectedCls:"current-prefix",
					
					/**
					 * hover项之后默认选中项css
					 * @type String
					 * @default "current-postfix"
					 * @optional
					 */
					postfixSelectedCls:"current-postfix",
					
					/**
					 * hover项css样式
					 * @type String
					 * @default "hover"
					 * @optional
					 */
					hoverCls:"hover",
					
					/**
					 * hover项之前step项目的css
					 * @type String
					 * @default "hover-step"
					 * @optional
					 */
					hoverStepCls:"hover-step",
					
					/**
					 * hover项前一项css
					 * @type String
					 * @default "hover-prev"
					 * @optional
					 */
					hoverPrevCls:"hover-prev",
					
					/**
					 * hover项下一项css
					 * @type String
					 * @default "hover-next"
					 * @optional
					 */
					hoverNextCls:"hover-next",
					
					/**
					 * 设置宽度（当isAutoFitWidth=true时有效）
					 * @type Number
					 * @optional
					 */
					width:null,
					
					/**
					 * 是否自适应宽度
					 * @default true
					 * @type Boolean
					 * @optional
					 */
					isAutoFitWidth:true,
					
					/**
					 * 自动适应宽度类型，e:子元素等宽，p:子元素按百分比设置
					 * @type String
					 * @default "e"
					 * @optional
					 */
					autoFitType:"e",
					
					/**
					 * 是否初始化style
					 * @default true
					 * @type Boolean
					 * @optional
					 */
					isInitStyle:true
					
					/**#@-*/
			};
			
			$.extend(this,defaultOptions,options||{});
		},
		
		/** @scope FE.ui.service.module.NavCrumb# */
		
		init:function(options){
			this.initOptions(options);	
			this.createComponent();
		},
		
		
		/**
		 * 通过index设置当前选中的item
		 * @public
		 * @param {Number} index 设置选中的index
		 */
		setSelectedIndex:function(index){
			this.items.each(function(i,el){
				if(index===index){
					$(el).addClass(this.selectedCls);
				}else{					
					$(el).removeClass(this.selectedCls);
				}
			});
		},
		
		/**
		 * 通过item的dom对象设置当前选中的item
		 * @public
		 * @param {HTMLElement} itemDom 设置选中的item
		 */
		setSelectedItem:function(itemDom){
			this.items.each(function(i,el){
				if(el===itemDom){
					$(el).addClass(this.selectedCls);
				}else{					
					$(el).removeClass(this.selectedCls);
				}
			});
		},
		
		
		/**
		 * Get the selected item.
		 * @public
		 * @returns {HTMLElement} The selected item HTMLElement,if not found return null.
		 */
		getSelectedItem:function(){
			var sel = this.ct.find("."+this.selectedCls);
			if(sel.length>0)return sel.first()[0];
			return null;
		},
		
		
		/**
		 * Get the selected item index;
		 * @public
		 * @returns {Number} The selected item index.
		 */
		getSelectedIndex:function(){
			var index = -1;
		    var sel = this.getSelectedItem();
			this.items.each(function(i,el){
				if(el === sel){
					index = i;
					return false;
				}
				
			});
			
			return index;
		},
		
		_clearClass:function(jel){
			var cls = [this.defaultSelectedCls,
			           this.hoverSelectedCls,
			           this.prefixSelectedCls,
			           this.postfixSelectedCls,
			           this.hoverCls,
			           this.hoverPrevCls,
			           this.hoverNextCls,
			           this.hoverStepCls];
			$.each(cls,function(i,item){				
				jel.removeClass(item);
			});
		},
		
		/**
		 * Fix jquery.data
		 * @private
		 * @param {HTMLElemenet|jQueryObejct|String} el
		 * @param {String} dataKey
		 */
		_getConfig:function(el,dataKey){
			try{
				var data = $(el).data(dataKey);
			   return typeof(data)==="object"?data:(new Function("return " + data + ";"))();
			}catch(e){
				return {};
			}
		},
	
		/**
		 * 创建组件
		 * @private
		 */
		createComponent:function(){
			var self = this;
			var container = $(self.container).first();
			
			var cfgs = this._getConfig(container,this._dateKey_);
			
			$.extend(this,cfgs);
			
			var items = container.find(self.itemSelector);

			this.ct = container;
			this.items = items;
			
			items.each(function(i,el){
				var j_el = $(el);
				j_el.bind(self.hoverEvent,function(e){
					  self._doHover(i,j_el,self,items,container);
					}).bind(self.unhoverEvent,function(e){
					  self._doUnHover(i,j_el,self,items,container);
				});
		    });
			
			if(this.isInitStyle){
				this._doUnHover(-1,null,self,items,container);
			}
			
			if(this.isAutoFitWidth){
				this.fitWidth(this.width);
			}
			
			this.onStartup(this);
		},
		
		
		/**
		 * 设置组件自适应制定宽度和自适应方式
		 * @public
		 * @param {Number} width 指定宽度（不设置则为容器宽度）
		 * @param {String} type 对齐方式
		 */
		fitWidth:function(width,type){
			var w = width || (this.ct.width());
			var t = type || this.autoFitType;
			
			var items = this.items,t_w = 0,winc = 0;
			
			if(t==="e"){
				var e_w = Math.floor(w/items.length);
				items.each(function(i,el){
					if(i==(items.length-1)){
						$(el).width(w-(items.length-1)*e_w);
					}else{
						$(el).width(e_w);
					}
					
				});				
			}else{			
				items.each(function(i,el){
					t_w += $(el).width();			
				});
				
				items.each(function(i,el){
					var jel = $(el);
					var i_w = 0;					
					i_w = i==(items.length-1)?(w - winc):(Math.floor(w*(jel.width())/t_w));					
					winc += i_w;	
					jel.width(i_w);
				});
			}
		},
		
		/**
		 * Set style class when item hover on.
		 * @private
		 * @param {Number} i
		 * @param {FE.ui.service.module.NavCrumb} crumb
		 * @param {jQueryObject} items
		 * @param {jQueryObject} ct
		 */
		_doHover:function(i,el,crumb,items,ct){			
			var selIdx = crumb.getSelectedIndex();
			
			items.each(function(s_i,s_el){
				var js_el = $(s_el);	
				crumb._clearClass(js_el);
				
				if(s_i<i && selIdx == s_i){
					js_el.addClass(crumb.prefixSelectedCls);					
					if(s_i==i-1 ){
						js_el.addClass(crumb.hoverPrevCls);
					}
				}else if(s_i>i && selIdx == s_i){
					js_el.addClass(crumb.postfixSelectedCls);
					if(s_i==i+1 ){
						js_el.addClass(crumb.hoverNextCls);
					}
				}else if(selIdx == s_i ){
					js_el.addClass(crumb.hoverSelectedCls);
				}else if(s_i==i+1 ){
					js_el.addClass(crumb.hoverNextCls);
				}else if(s_i==i-1){
					js_el.addClass(crumb.hoverPrevCls);
				}else if(s_i<i){
					js_el.addClass(crumb.hoverStepCls);
				}
				
				
				
				if(!el.hasClass(crumb.selectedCls)){
					el.addClass(crumb.hoverCls);
				}
			});
					
			crumb.onHover(crumb);
		},
		
		
		/**
		 * Set style class when item hover off.
		 * @private
		 * @param {Number} i
		 * @param {FE.ui.service.module.NavCrumb} crumb
		 * @param {jQueryObject} items
		 * @param {jQueryObject} ct
		 */
        _doUnHover:function(i,el,crumb,items,ct){
			var selIdx = crumb.getSelectedIndex();
			
			items.each(function(s_i,s_el){
				var js_el = $(s_el);	
				crumb._clearClass(js_el);
				
				if(s_i==selIdx-1){
					js_el.addClass(crumb.hoverPrevCls);
				}else if(s_i==selIdx+1){
					js_el.addClass(crumb.hoverNextCls);
				}else if(s_i==selIdx){
					js_el.addClass(crumb.defaultSelectedCls);
				}else if(s_i<selIdx){
					js_el.addClass(crumb.hoverStepCls);
				}
				
			});	
			
			crumb.onUnHover(crumb);
		},
		
		
		/**
		 * 组件初始化事件
		 * @event
		 * @param {FE.ui.service.module.NavCrumb} cmp
		 */
		onStartup:function(cmp){},
		
		/**
		 * 组件item hover事件
		 * @event
		 * @param {FE.ui.service.module.NavCrumb} cmp
		 */
		onHover:function(cmp){},
		
		/**
		 * 组件item unhover事件
		 * @event
		 * @param {FE.ui.service.module.NavCrumb} cmp
		 */
		onUnHover:function(cmp){}
		
	};
})(jQuery,FE.ui.service.module);