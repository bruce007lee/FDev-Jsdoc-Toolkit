
/**
 * Namespace
 * @namespace
 * @name FE.operation.module
 */
jQuery.namespace('FE.operation.module');

(function($,M){
	
/**
 * �򵥵����˵��ؼ�.��֧�ֶ����ʾ��
 * @author bruce.liz
 * @constructor
 * @name FE.operation.module.NavMenu
 * @param {Object} options �����õĲ�������Configuration Summary��
 * @requires jQuery
 * @example
 *     new FE.operation.module.NavMenu({
 *         container:"#containerId",//�˵�����
 *         parent:".parentClass",//�˵����ڵ�css selector
 *         child:".childClass"//�˵��ӽڵ�css selector
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
				 * �˵���ʾ�¼�
				 * @default "mouseenter"
				 * @type String
				 * @cfg
				 */
				showEvent:"mouseenter",
				
				/**
				 * �˵������¼�
				 * @default "mouseleave"
				 * @type String
				 * @cfg
				 */
				hideEvent:"mouseleave",
				
				/**
				 * �˵�����cssѡ����
				 * @default "#menu-container"
				 * @type String
				 * @cfg
				 */
				container:"#menu-container",
				
				/**
				 * �˵����ڵ�cssѡ����
				 * @default ".parent-node"
				 * @type String
				 * @cfg
				 */
				parent:".parent-node",
				
				/**
				 * �˵��ӽڵ�cssѡ����
				 * @default ".child-node"
				 * @type String
				 * @cfg
				 */
				child:".child-node",
				
				/**
				 * �˵����ڵ�ѡ��ʱ������ʽ
				 * @default "current"
				 * @type String
				 * @cfg
				 */
				selectedCls:"current",
				
				/**
				 * ���ò˵��Ƿ�����Ӧλ�á�
				 * @default true
				 * @type Boolean
				 * @cfg
				 */
				isPositionMenuItem:true,
				
				/**
				 * �˵����뷽ʽ "rt":���� "lb":����
				 * @default "rt"
				 * @type String
				 * @cfg
				 */
				alignType:"rt",
				
				/**
				 * ���ò˵���ʾλ��margin
				 * @default {Object} {top:0,left:0}
				 * @type Object
				 * @cfg
				 */
				marginAlign:{top:0,left:0},
				
				/**
				 * ���ò˵���ʧ�ӳ�ʱ��(ms)
				 * @default 300
				 * @type Number
				 * @cfg
				 */
				hideDelay:300,
				
				/**
				 * ���ò˵���ʧ����
				 * @type Object
				 * @cfg
				 */
				hideAnimate:null,

				
				/**
				 * �˵�����Ľڵ�dom
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
	 * �������
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
	 * ���õ�ǰ��ʾ�˵���λ�ã���ͨ����ʼ���ع�
	 * @public
	 * @param {jQueryObject} parent �˵����ڵ�jquery����
	 * @param {jQueryObject} child �˵��ӽڵ�jquery����
	 * @param {FE.operation.module.NavMenu} comp ��ǰNavMenu����
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
		 default:/* Ĭ�϶��뷽ʽΪ"rt" */  
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
	 * �õ��˵����.(������1��ʼ����)
	 * @public
	 * @param {jQueryObject} menuItem �˵���jquery����
	 * @returns {Number} �˵�����
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
	 * �õ���ǰ��ʾ�˵���Ķ��뷽ʽ����ͨ����ʼ���ع�
	 * @public
	 * @param {jQueryObject} parent �˵����ڵ�jquery����
	 * @param {jQueryObject} child �˵��ӽڵ�jquery����
	 * @param {FE.operation.module.NavMenu} comp ��ǰNavMenu����
	 * @returns {String} �˵�����뷽ʽ
	 */
    getAlignType:function(parent,child,comp){	
		return this.alignType;
	},
	
	/**
	 * �õ���ǰ��ʾ�˵����λ�ã���ͨ����ʼ���ع�
	 * @public
	 * @param {jQueryObject} parent �˵����ڵ�jquery����
	 * @param {jQueryObject} child �˵��ӽڵ�jquery����
	 * @param {FE.operation.module.NavMenu} comp ��ǰNavMenu����
	 * @returns {Object} �˵���λ�� ex:{top:20,left:130}
	 */
	getItemPosition:function(newPos,parent,child){
		return newPos;
	},
	
	
	/**
	 * �˵���ʾ�¼�����ͨ����ʼ���ع�
	 * @event
	 * @param {jQueryObject} parent �˵����ڵ�jquery����
	 * @param {jQueryObject} child �˵��ӽڵ�jquery����
	 * @param {FE.operation.module.NavMenu} comp ��ǰNavMenu����
	 */
	onShow:function(parent,child,comp){		
	},
	
	/**
	 * �˵������¼�����ͨ����ʼ���ع�
	 * @event
	 * @param {jQueryObject} parent �˵����ڵ�jquery����
	 * @param {jQueryObject} child �˵��ӽڵ�jquery����
	 * @param {FE.operation.module.NavMenu} comp ��ǰNavMenu����
	 */
	onHide:function(parent,child,comp){
	}
	
};

})(jQuery,FE.operation.module);


