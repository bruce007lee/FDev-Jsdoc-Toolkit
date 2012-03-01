
/**
 * Namespace
 * @namespace
 * @name FE.operation.module
 */
jQuery.namespace('FE.operation.module');

(function($,M){
	
/**
 * 简单导航菜单控件.（支持多层显示）
 * @author bruce.liz
 * @constructor
 * @name FE.operation.module.NavMenu
 * @param {Object} options 可设置的参数（见Configuration Summary）
 * @requires jQuery
 * @example
 *     new FE.operation.module.NavMenu({
 *         container:"#containerId",//菜单容器
 *         parent:".parentClass",//菜单父节点css selector
 *         child:".childClass"//菜单子节点css selector
 *     });
 */
M.NavMenu = function(options){
  this.init(options);
};

M.NavMenu.prototype={
		
	initOptions:function(options){		
		var defaultOptions={	
				/** @scope FE.operation.module.NavMenu#*/
	
				/**
				 * 菜单显示事件
				 * @default "mouseenter"
				 * @type String
				 * @cfg
				 */
				showEvent:"mouseenter",
				
				/**
				 * 菜单隐藏事件
				 * @default "mouseleave"
				 * @type String
				 * @cfg
				 */
				hideEvent:"mouseleave",
				
				/**
				 * 菜单容器css选择器
				 * @default "#menu-container"
				 * @type String
				 * @cfg
				 */
				container:"#menu-container",
				
				/**
				 * 菜单父节点css选择器
				 * @default ".parent-node"
				 * @type String
				 * @cfg
				 */
				parent:".parent-node",
				
				/**
				 * 菜单子节点css选择器
				 * @default ".child-node"
				 * @type String
				 * @cfg
				 */
				child:".child-node",
				
				/**
				 * 菜单父节点选中时附加样式
				 * @default "current"
				 * @type String
				 * @cfg
				 */
				selectedCls:"current",
				
				/**
				 * 设置菜单是否自适应位置。
				 * @default true
				 * @type Boolean
				 * @cfg
				 */
				isPositionMenuItem:true,
				
				/**
				 * 菜单对齐方式 "rt":右上 "lb":左下
				 * @default "rt"
				 * @type String
				 * @cfg
				 */
				alignType:"rt",
				
				/**
				 * 设置菜单显示位置margin
				 * @default {Object} {top:0,left:0}
				 * @type Object
				 * @cfg
				 */
				marginAlign:{top:0,left:0},
				
				/**
				 * 设置菜单消失延迟时间(ms)
				 * @default 300
				 * @type Number
				 * @cfg
				 */
				hideDelay:300,
				
				/**
				 * 设置菜单消失动画
				 * @type Object
				 * @cfg
				 */
				hideAnimate:null,

				
				/**
				 * 菜单对齐的节点dom
				 * @default options.container
				 * @type String|HTMLElement|jQueryObject
				 * @cfg
				 */
				alignElement:null			
		};
		
		$.extend(this,defaultOptions,options||{});
	},
	
	/** @scope FE.operation.module.NavMenu#*/
	
	init:function(options){
		this.initOptions(options);	
		this.createComponent();
	},
	
	/**
	 * 创建组件
	 * @private
	 */
	createComponent:function(){
		var self = this;
		var container = $(self.container).first()
		,parentNodes = container.find(self.parent);
		
		$(self.child).each(function(i,el){
			$(el).css("display","none")
			     .css("position","absolute");
		});
		
		parentNodes.each(function(i,el){	
			var child = $(el).children(self.child).first();
			$(el).bind(self.showEvent,function(e){
				if(self._curItem){
					if(self.hideAnimate){
					   self._curItem.stop(false,true);
					}else{
					   self._curItem.stop();
					}
				 self._curItem = null;
				}
				self._onShow.call(self,e,$(el),child,self);
			}).bind(self.hideEvent,function(e){				
				if(self.hideDelay>0){					
					if(self.hideAnimate){
						self._curItem = child.animate(self.hideAnimate,self.hideDelay,function(){
							self._onHide.call(self,e,$(el),child,self);
							self._curItem = null;
					    });	
					}else{
						self._curItem = child.delay(self.hideDelay).hide(0,function(){
							self._onHide.call(self,e,$(el),child,self);
							self._curItem = null;
					    });						
					}
				}else{
				  self._onHide.call(self,e,$(el),child,self);
				}
			});
		});
	},
	
	_onShow:function(e,parent,child,comp){
		child.show();
		if(this.selectedCls){parent.addClass(this.selectedCls);}
		if(this.isPositionMenuItem){this.setMenuItemPosition(parent,child,comp);}
		this.onShow(parent,child,comp);
	},
	
	_onHide:function(e,parent,child,comp){
		  child.hide();
		  if(this.selectedCls){parent.removeClass(this.selectedCls);}
		  this.onHide(parent,child,comp);
	},
	
	/**
	 * 设置当前显示菜单项位置，可通过初始化重构
	 * @public
	 * @param {jQueryObject} parent 菜单父节点jquery对象
	 * @param {jQueryObject} child 菜单子节点jquery对象
	 * @param {FE.operation.module.NavMenu} comp 当前NavMenu对象
	 */
	setMenuItemPosition:function(parent,child,comp){
		var p_offset = parent.offset();
       
		var top=0,left=0;
		var m = this.marginAlign;
		switch(this.getAlignType(parent,child,comp)){
		 case "lb":		  
		   top = p_offset.top + p_offset.outerWidth();
		   left = p_offset.left;
			if(m && m.left){left += m.left;}
			if(m && m.top){top += m.top;}			 
		   break;
		 default:/* 默认对齐方式为"rt" */  
		   top = p_offset.top;
		   left = p_offset.left + parent.outerWidth(); 
		   
           var w_top =0,w_h =0,a_top=0;
           
           var alignEl = $(this.alignElement || this.container);
           
           if(alignEl.length>0){
        	   a_top = alignEl.first().offset().top;       	   
           }else{
        	   alignEl = null;
           }

           w_top = $(window).scrollTop();
		   w_h = $(window).height();

		   if(m && m.left){left += m.left;}
			if(m && m.top){top += m.top;}	
		   
		   if( child.outerHeight()+top > w_top+w_h){
			   top -= (child.outerHeight()+top-w_top-w_h);
			   if(top<w_top){top=w_top;}			   
			   if(alignEl && top<a_top){top=a_top;}
		   }
		   
		}
		
		child.offset(this.getItemPosition({left:left,top:top},parent,child));
	},
	
	/**
	 * 得到菜单项级别.(级别由1开始递增)
	 * @public
	 * @param {jQueryObject} menuItem 菜单项jquery对象
	 * @returns {Number} 菜单级数
	 */
	getItemLevel:function(menuItem){
		if($(this.container).length>0){
			var lvl = 0;
			for(var p = menuItem.parent();p.length>0;p=p.parent()){
				if(p.is(this.container)){return lvl;}
				if(p.is(this.parent)){lvl++;}
			}
		}
		return -1;
	},
	
	/**
	 * 得到当前显示菜单项的对齐方式，可通过初始化重构
	 * @public
	 * @param {jQueryObject} parent 菜单父节点jquery对象
	 * @param {jQueryObject} child 菜单子节点jquery对象
	 * @param {FE.operation.module.NavMenu} comp 当前NavMenu对象
	 * @returns {String} 菜单项对齐方式
	 */
    getAlignType:function(parent,child,comp){	
		return this.alignType;
	},
	
	/**
	 * 得到当前显示菜单项的位置，可通过初始化重构
	 * @public
	 * @param {jQueryObject} parent 菜单父节点jquery对象
	 * @param {jQueryObject} child 菜单子节点jquery对象
	 * @param {FE.operation.module.NavMenu} comp 当前NavMenu对象
	 * @returns {Object} 菜单项位置 ex:{top:20,left:130}
	 */
	getItemPosition:function(newPos,parent,child){
		return newPos;
	},
	
	
	/**
	 * 菜单显示事件，可通过初始化重构
	 * @event
	 * @param {jQueryObject} parent 菜单父节点jquery对象
	 * @param {jQueryObject} child 菜单子节点jquery对象
	 * @param {FE.operation.module.NavMenu} comp 当前NavMenu对象
	 */
	onShow:function(parent,child,comp){		
	},
	
	/**
	 * 菜单隐藏事件，可通过初始化重构
	 * @event
	 * @param {jQueryObject} parent 菜单父节点jquery对象
	 * @param {jQueryObject} child 菜单子节点jquery对象
	 * @param {FE.operation.module.NavMenu} comp 当前NavMenu对象
	 */
	onHide:function(parent,child,comp){
	}
	
};

})(jQuery,FE.operation.module);


