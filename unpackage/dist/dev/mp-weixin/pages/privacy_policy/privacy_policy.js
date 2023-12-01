"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "privacy_policy",
  setup(__props) {
    const privacyContent = `
	<p>
	    本客户端尊重并保护所有使用本客户端用户的个人隐私权。为了给您提供更好的服务，本客户端会按照本隐私权政策的规定使用您的个人信息。但本客户端将以高度的严谨态度，审慎对待这些信息。我们制定本“隐私政策”并希望您在使用本客户端及相关服务前仔细阅读并理解本隐私政策，以便做出自愿的适当的选择。若您同意该隐私政策说明您已经完全理解并了解该隐私政策内容。 一、适用范围： 我们会遵循隐私政策使用用户信息，但不会仅因同意本隐私政策而采用强制捆绑的方式收集信息。 当您使用或开启相关功能或使用服务时，为实现功能、服务所必需，我们会收集、使用相关信息。除非是为实现基本业务功能或根据法律法规要求所必需的必要信息，您均可以拒绝提供且不影响其他功能或服务。 在仅浏览时，为保障服务所必需，我们会读取用户设备状态和身份用于资讯推送； 如果您未登录帐号，我们会通过设备对应的标识符信息来保障信息推送的基本功能。如果您登录了账号，我们会根据账号信息实现信息推送。 通讯录、GPS精确地理位置、摄像头、麦克风、相册权限，均不会默认开启，只有经过您的明示授权才会在为实现特定功能或服务时使用，您也可以撤回授权。已授权后也不会在相关功能或服务不需要时而收集您的信息。 系统会根据您的注册等操作需要给您发送验证码等短信信息，仅为了让您顺利的完成注册并使用本客户端，不会侵犯您的隐私。 二、信息使用 本客户端不会向任何无关第三方提供、出售、出租、分享或交易您的个人信息，除非事先得到您的许可，或该第三方和本客户端（含本客户端关联公司）单独或共同为您提供服务，且在该服务结束后，其将被禁止访问包括其以前能够访问的所有这些资料。 ◆ 注册、登录 a. 当您注册、登录本客户端及相关服务时，您可以通过手机号创建账号，并且您可以完善相关的网络身份识别信息（头像、昵称、密码），收集这些信息是为了帮助您完成注册。您还可以根据自身需求选择填写性别、生日、地区及个人介绍来完善您的信息，手机注册时程序会给您发送短信验证码便于您顺利完成注册。 b. 您也可以使用第三方账号登录并使用，您将授权我们获取您在第三方平台注册的公开信息（头像、昵称以及您授权的其他信息），用于与本客户端账号绑定，使您可以直接登录并使用本产品和相关服务。 ◆ 认证 在您使用身份认证的功能或服务时，根据相关法律法规，您可能需要提供您的真实身份信息（真实姓名、身份证号码、电话号码）以完成实名验证。 这些信息属于个人敏感信息，您可以拒绝提供，但您将可能无法获得相关服务，但不影响其他功能与服务的正常使用。 ◆ 浏览 a.本客户端可能会向您推荐新闻或服务的信息，为实现这一功能，我们可能会收集必要的日志信息。 b.用于信息展示的日志信息包括： 操作行为信息：点击、关注、收藏、搜索、浏览、分享 您主动提供的信息：反馈、发布、点赞、评论 地理位置信息：GPS信息、WLAN接入点、蓝牙和基站等传感器信息 c.GPS地理位置是敏感个人信息，若您拒绝提供，我们将不会根据GPS信息向您推荐信息，且不会影响本客户端其他功能的正常使用，但会影响需要该信息支持的相关功能的使用。 ◆ 信息发布 a.您发布内容、评论、提问或回答时，我们将收集您发布的信息，并展示您的昵称、头像、发布内容。 b.您使用上传图片、发布音视频功能时，我们会请求您授权相机、照片、麦克风权限。您如果拒绝授权提供，将无法使用此功能，但不影响您正常使用本客户端的其他功能。 c.您发布信息并选择显示位置时，我们会请求您授权地理位置权限，并收集与本服务相关的位置信息。您如果拒绝授权提供精确地理位置信息，将无法使用此功能，但不影响您正常使用本客户端的其他功能。 d.用户因使用我们的产品或者服务而被我们收集的信息，例如其他用户发布的信息中可能含有您的部分信息（如：在评论、留言、发布图文、音视频中涉及到与您相关的信息）。 ◆ 互动交流 a.在您主动使用“随手拍”“话题”等进行浏览、评论、收藏、点赞或分享内容时，我们会收集您关注的账号，并向您展示您关注账号发布内容。 ◆ 搜索 您使用“本客户端”的搜索服务时，我们会收集您的搜索关键字信息、日志记录。为了提供高效的搜索服务，部分前述信息会暂时存储在您的本地存储设备之中，并可向您展示搜索结果内容、搜索历史记录。 ◆ 设备与日志信息 a.为了保障软件与服务的安全运行，我们会收集您的硬件型号、操作系统版本号、国际移动设备识别码、唯一设备标识符、网络设备硬件地址、IP 地址、WLAN接入点、蓝牙、基站、软件版本号、网络接入方式、类型、状态、网络质量数据、操作、使用、服务日志。 b.为了预防恶意程序及安全运营所必需，我们会收集安装的应用信息或正在运行的进程信息、应用程序的总体运行、使用情况与频率、应用崩溃情况、总体安装使用情况、性能数据、应用来源。 ◆ 信息收集的变更 随着我们业务的发展，可能会对“本客户端”的功能和提供的服务有所调整变化。原则上，当新功能或服务与我们当前提供的功能或服务相关时，收集与使用的个人信息将与原处理目的具有直接或合理关联。在与原处理目的无直接或合理关联的场景下，我们收集、使用您的个人信息，会再次进行告知，并征得您的同意。 ◆ 依法豁免征得同意收集和使用的个人信息 根据法律法规及相关国家标准，我们收集和使用您的个人信息无需征得您的授权同意： a.与国家安全、国防安全直接相关的； b.与公共安全、公共卫生、重大公共利益直接相关的； c. 公安机关、检察机关、法院、仲裁机构、公证机构等司法机关或司法机关委托的工作人员、律师要求提供的； d.出于维护个人信息主体或其他个人的生命、财产等重大合法权益但又很难得到本人同意的； e.所收集的您的个人信息是您自行向社会公众公开的； f.从合法公开披露的信息中收集的您的个人信息的，如合法的新闻报道、政府信息公开等渠道； g.根据您的要求签订或履行合同所必需的； h.用于维护软件及相关服务的安全稳定运行所必需的，例如发现、处置软件及相关服务的故障； i.为合法的新闻报道所必需的； j.学术研究机构基于公共利益开展统计或学术研究所必要，且对外提供学术研究或描述的结果时，对结果中所包含的个人信息进行去标识化处理的； k.因您在本客户端发表的言论可能侵犯第三方的合法权益，第三方要求提供的； l.法律法规规定的其他情形。 三、Cookie的使用 ◆ 安全性能保障 我们可能会设置认证与保障安全性的 cookie 或匿名标识符，使我们确认您是否安全登录服务，或者是否遇到盗用、欺诈及其他不法行为。这些技术还会帮助我们改进服务效率，提升登录和响应速度。 ◆ 信息记忆 使用此类技术可以帮助您省去重复您填写个人信息、输入搜索内容的步骤和流程（示例：记录搜索、表单填写）。 ◆ 优化服务 a.我们可能会利用 Cookie 和同类技术了解您的偏好和使用习惯，进行数据分析，以改善产品服务、推荐用户感兴趣的信息或功能，并优化您的选择。 b.在本客户端的分享页中，我们可能会使用cookie对浏览活动进行记录，用于向您推荐信息和排查崩溃、延迟的相关异常情况以及探索更好的服务方式。 ◆ cookie的清除 大多数浏览器均为用户提供了清除浏览器缓存数据的功能，您可以在浏览器设置功能中进行相应的数据清除操作。如您进行清除，可能因为这些修改，您可能无法使用依赖于Cookie由公司提供的服务或相应功能。 四、个人信息 ◆ 共享原则 ● 向我们的关联方、第三方共享您的个人信息，需经过您的授权同意，除非共享的个人信息是去标识化处理后的信息，且共享第三方无法重新识别此类信息的自然人主体。如果关联方、第三方使用信息的目的超越原授权同意范围，他们需要重新征得您的同意。 ● 向关联方、第三方共享的数据必须具有合法正当目的，且共享的数据以达成目的必要为限。 ● 我们将审慎评估关联方、第三方数据使用共享信息的目的，对这些合作方的安全保障能力进行综合评估，并要求其遵循合作法律协议。我们会对合作方获取信息的软件工具开发包（SDK）、应用程序接口（API）进行严格的安全监测，以保护数据安全。 ◆ 共享信息 a.登录第三方账号：当您使用本客户端账号登录第三方产品时，经过您的同意，我们可能会将您的昵称、头像及其他您授权的信息与您登录的第三方产品共享。 b.地理位置服务：当您使用地理位置相关服务时，我们会将GPS信息与位置服务提供商（百度地图）进行共享以便可以向您返回位置结果。GPS信息是敏感个人信息，拒绝提供，仅会影响地理位置服务功能，但不影响其他功能的正常使用。 ◆ 广告 我们可能会向该应用投放广告，您如果不喜欢可以关闭广告。 ◆ 依法豁免征得同意共享、公开披露的个人信息 根据法律法规及国家标准，我们共享、公开披露您的个人信息无需征得您的授权同意： a.与国家安全、国防安全直接相关的； b.与公共安全、公共卫生、重大公共利益直接相关的； c.与犯罪侦查、起诉、审判和判决执行等直接相关的； d.出于维护您或其他个人的生命、财产等重大合法权益但又很难得到本人同意的； e.您自行向社会公众公开的个人信息； f.从合法公开披露的信息中收集个人信息的，如合法的新闻报道、政府信息公开等渠道。 五、信息的存储和保护 ◆ 存储地点 我们依照法律法规的规定，将在境内运营过程中收集和产生的您的个人信息存储于中华人民共和国境内。目前，我们不会将上述信息传输至境外，如果我们向境外传输，我们将会遵循相关国家规定或者征求您的同意。 ◆ 存储期限 我们仅在为提供“本客户端”及服务之目的所必需的期间内保留您的个人信息：您发布的信息、评论、点赞及相关信息，在您未撤回、删除或未注销账号期间，我们会保留相关信息。超出必要期限后，我们将对您的个人信息进行删除或匿名化处理，但法律法规另有规定的除外。 ◆ 个人信息的安全保护 ● 我们会使用加密技术、匿名化处理及相关合理可行的手段保护您的个人信息，并使用安全保护机制防止您的个人信息遭到恶意攻击。 ● 我们会建立保障您的个人信息安全。我们采取严格的数据使用和访问制度，确保只有授权人员才可访问您的个人信息，并适时对数据和技术进行安全处理。 ● 您接入我们的服务所用的系统和通讯网络，有可能因我们可控范围外的因素而出现问题。因此，我们强烈建议您采取积极措施保护个人信息的安全，包括但不限于使用复杂密码、定期修改密码、不将自己的账号密码及相关个人信息透露给他人。 ● 我们会制定应急处理预案，并在发生用户信息安全事件时立即启动应急预案，努力阻止这些安全事件的影响和后果扩大。同时，我们还将按照相关监管部门要求，上报用户信息安全事件的处置情况。 ● 您一旦离开“本客户端”及相关服务，浏览或使用其他网站、服务及内容资源，我们将没有能力和直接义务保护您在本客户端及相关服务之外的软件、网站提交的任何个人信息，无论您登录、浏览或使用上述软件、网站是否基于“本客户端”的链接或引导。 六、联系我们 如果您对个人信息保护问题有任何提问请发送邮件至（84539545@qq.com），我们将尽快与您联系。</p>
	`;
    return (_ctx, _cache) => {
      return {
        a: privacyContent
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/zikn/Project/parking-client/pages/privacy_policy/privacy_policy.vue"]]);
wx.createPage(MiniProgramPage);