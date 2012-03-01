

/**
 * @name FE.ui.service.module
 * @namespace
 */
jQuery.namespace("FE.ui.service.module");


(function($,M){
	
	/**
	 * ���мʽ������
	 * @author bruce.liz
	 * @constructor
	 * @name FE.ui.service.module.NavCrumb
	 * @param {Object} options �����õĲ�������Configuration Summary��
	 * @requires jQuery
	 * @example
	 *     new FE.ui.service.module.NavCrumb({
	 *         container:"#containerId",//�˵�����
	 *         itemSelector:"> li"//item��cssѡ����
	 *     });
	 */
	M.NavCrumb = function(options){
		  this.init(options);
	};

	M.NavCrumb.prototype={
			/**@scope FE.ui.service.module.NavCrumb#*/
			
			/**
			 * ������jquery����
			 * @type jQueryObject
			 */
			ct:null,
			
			/**
			 * �˵���jquery����
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
					 * �������css selector
					 * @type String
					 */
					container:"#s-crumb",

					/**
					 * �������css selector
					 * @type String
					 */
					itemSelector:"> li",
					
					/**
					 * hover�¼���
					 * @type String
					 * @default "mouseenter"
					 * @optional
					 */
					hoverEvent:"mouseenter",

					/**
					 * unhover�¼���
					 * @type String
					 * @default "mouseleave"
					 * @optional
					 */
					unhoverEvent:"mouseleave",
					
					/**
					 * ѡ�����ʶcss��
					 * @type String
					 * @default "current"
					 * @optional
					 */
					selectedCls:"current",
					
					/**
					 * Ĭ��ѡ����css
					 * @type String
					 * @default "current-default"
					 * @optional
					 */
					defaultSelectedCls:"current-default",
					
					/**
					 * hoverĬ��ѡ����css
					 * @type String
					 * @default "current-hover"
					 * @optional
					 */
					hoverSelectedCls:"current-hover",
					
					/**
					 * hover��֮ǰĬ��ѡ����css
					 * @type String
					 * @default "current-prefix"
					 * @optional
					 */
					prefixSelectedCls:"current-prefix",
					
					/**
					 * hover��֮��Ĭ��ѡ����css
					 * @type String
					 * @default "current-postfix"
					 * @optional
					 */
					postfixSelectedCls:"current-postfix",
					
					/**
					 * hover��css��ʽ
					 * @type String
					 * @default "hover"
					 * @optional
					 */
					hoverCls:"hover",
					
					/**
					 * hover��֮ǰstep��Ŀ��css
					 * @type String
					 * @default "hover-step"
					 * @optional
					 */
					hoverStepCls:"hover-step",
					
					/**
					 * hover��ǰһ��css
					 * @type String
					 * @default "hover-prev"
					 * @optional
					 */
					hoverPrevCls:"hover-prev",
					
					/**
					 * hover����һ��css
					 * @type String
					 * @default "hover-next"
					 * @optional
					 */
					hoverNextCls:"hover-next",
					
					/**
					 * ���ÿ�ȣ���isAutoFitWidth=trueʱ��Ч��
					 * @type Number
					 * @optional
					 */
					width:null,
					
					/**
					 * �Ƿ�����Ӧ���
					 * @default true
					 * @type Boolean
					 * @optional
					 */
					isAutoFitWidth:true,
					
					/**
					 * �Զ���Ӧ������ͣ�e:��Ԫ�صȿ�p:��Ԫ�ذ��ٷֱ�����
					 * @type String
					 * @default "e"
					 * @optional
					 */
					autoFitType:"e",
					
					/**
					 * �Ƿ��ʼ��style
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
		 * ͨ��index���õ�ǰѡ�е�item
		 * @public
		 * @param {Number} index ����ѡ�е�index
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
		 * ͨ��item��dom�������õ�ǰѡ�е�item
		 * @public
		 * @param {HTMLElement} itemDom ����ѡ�е�item
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
		 * �������
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
		 * �����������Ӧ�ƶ���Ⱥ�����Ӧ��ʽ
		 * @public
		 * @param {Number} width ָ����ȣ���������Ϊ������ȣ�
		 * @param {String} type ���뷽ʽ
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
		 * �����ʼ���¼�
		 * @event
		 * @param {FE.ui.service.module.NavCrumb} cmp
		 */
		onStartup:function(cmp){},
		
		/**
		 * ���item hover�¼�
		 * @event
		 * @param {FE.ui.service.module.NavCrumb} cmp
		 */
		onHover:function(cmp){},
		
		/**
		 * ���item unhover�¼�
		 * @event
		 * @param {FE.ui.service.module.NavCrumb} cmp
		 */
		onUnHover:function(cmp){}
		
	};
})(jQuery,FE.ui.service.module);