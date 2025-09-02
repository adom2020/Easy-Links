import {
    Editor as e,
    Mark as t,
    Extension as a
} from "https://esm.sh/@tiptap/core@2";
import s from "https://esm.sh/@tiptap/starter-kit@2";
import {
    Mention as n
} from "https://esm.sh/@tiptap/extension-mention@2";
import {
    Placeholder as o
} from "https://esm.sh/@tiptap/extension-placeholder@2";
import {
    CharacterCount as i
} from "https://esm.sh/@tiptap/extension-character-count@2";
import {
    Image as l
} from "https://esm.sh/@tiptap/extension-image@2";
import {
    Link as r
} from "https://esm.sh/@tiptap/extension-link@2";
import {
    Underline as c
} from "https://esm.sh/@tiptap/extension-underline@2";
import {
    Code as d
} from "https://esm.sh/@tiptap/extension-code@2";
import {
    CodeBlock as m
} from "https://esm.sh/@tiptap/extension-code-block@2";
import {
    BubbleMenu as g
} from "https://esm.sh/@tiptap/extension-bubble-menu@2";
import {
    FloatingMenu as p
} from "https://esm.sh/@tiptap/extension-floating-menu@2";
import {
    Strike as u
} from "https://esm.sh/@tiptap/extension-strike@2";
import {
    InputRule as h
} from "https://esm.sh/@tiptap/core@2";
import * as f from "https://esm.sh/prosemirror-state@1";
import * as v from "https://esm.sh/prosemirror-view@1";
window.TipTap = {
    Editor: e,
    Mark: t,
    Extension: a,
    StarterKit: s,
    Mention: n,
    Placeholder: o,
    CharacterCount: i,
    Image: l,
    Link: r,
    Underline: c,
    Code: d,
    CodeBlock: m,
    BubbleMenu: g,
    FloatingMenu: p,
    Strike: u,
    InputRule: h,
    PM: {
        ...f,
        ...v
    }
};
let {
    Fragment: _Fragment,
    Teleport: _Teleport,
    Transition: _Transition,
    TransitionGroup: _TransitionGroup,
    canvasRef: canvasRef,
    computed: computed,
    createApp: createApp,
    createBlock: _createBlock,
    createCommentVNode: _createCommentVNode,
    createElementBlock: _createElementBlock,
    createElementVNode: _createElementVNode,
    createTextVNode: _createTextVNode,
    createVNode: _createVNode,
    defineComponent: defineComponent,
    nextTick: nextTick,
    normalizeClass: _normalizeClass,
    normalizeStyle: _normalizeStyle,
    onBeforeUnmount: onBeforeUnmount,
    onBeforeUpdate: onBeforeUpdate,
    onMounted: onMounted,
    onUnmounted: onUnmounted,
    onUpdated: onUpdated,
    openBlock: _openBlock,
    reactive: reactive,
    ref: ref,
    renderList: _renderList,
    resolveComponent: _resolveComponent,
    shallowReactive: shallowReactive,
    shallowRef: shallowRef,
    toDisplayString: _toDisplayString,
    toRef: toRef,
    toRefs: toRefs,
    vModelSelect: _vModelSelect,
    vModelText: _vModelText,
    vShow: _vShow,
    watch: watch,
    watchEffect: watchEffect,
    withCtx: _withCtx,
    withDirectives: _withDirectives,
    withKeys: _withKeys,
    withModifiers: _withModifiers
} = Vue;
! function() {
    "use strict";
    let e = defineComponent({
            props: ["onSelect", "emojiData", "discordAssets", "activeTab", "reactionMode", "hasStickersPermission", "hasServerEmojisPermission"],
            emits: ["tabChange"],
            setup(e, {
                emit: t
            }) {
                let a = shallowReactive({
                        activeCategory: "server",
                        hoveredEmoji: null,
                        hoveredSticker: null,
                        loading: !1,
                        error: null,
                        emojiSet: "apple",
                        scrollTop: 0,
                        containerHeight: 420,
                        itemHeight: 40,
                        itemsPerRow: 8,
                        stickerItemsPerRow: 4,
                        stickerHeight: 130,
                        rowHeight: 40,
                        visibleStartIndex: 0,
                        visibleEndIndex: 0,
                        imageCache: new Map,
                        scrollRAF: null,
                        currentTab: e.activeTab || "emojis",
                        isInitialized: !1
                    }),
                    s = ref(null),
                    n = ref(null);
                watch(() => e.activeTab, e => {
                    a.currentTab = e, a.scrollTop = 0, n.value && (n.value.scrollTop = 0)
                }), watch(() => e.discordAssets, (t, s) => {
                    !t || s && t.emojis?.length === s?.emojis?.length && t.stickers?.length === s?.stickers?.length ? t && t.isLoaded && (a.loading = !1) : (a.isInitialized = !1, c(), t.emojis?.length && e.hasServerEmojisPermission && (a.activeCategory = "server"), a.loading = !1)
                }, {
                    deep: !0
                });
                let o = function(e) {
                        let t = new Map;
                        return function(...a) {
                            let s = JSON.stringify(a);
                            if (t.has(s)) return t.get(s);
                            let n = e.apply(this, a);
                            return t.set(s, n), n
                        }
                    }(e => e.isCustom ? e.src : `https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/${e.unified.toLowerCase()}.png`),
                    i = computed(() => {
                        let t = [];
                        return e.discordAssets?.emojis?.length && t.push({
                            id: "server",
                            name: "Server Emojis",
                            emoji: "\uD83D\uDC8E"
                        }), t.concat([{
                            id: "people",
                            name: "Smileys & People",
                            emoji: "\uD83D\uDE00"
                        }, {
                            id: "nature",
                            name: "Animals & Nature",
                            emoji: "\uD83D\uDC3B"
                        }, {
                            id: "foods",
                            name: "Food & Drink",
                            emoji: "\uD83C\uDF54"
                        }, {
                            id: "activity",
                            name: "Activity",
                            emoji: "⚽"
                        }, {
                            id: "places",
                            name: "Travel & Places",
                            emoji: "✈️"
                        }, {
                            id: "objects",
                            name: "Objects",
                            emoji: "\uD83D\uDCA1"
                        }])
                    }),
                    l = window.chatState?.config?.Settings?.Filter?.InappropriateEmojis || ["\uD83C\uDF46", "\uD83C\uDF51", "\uD83E\uDD52", "\uD83C\uDF2D", "\uD83E\uDD55", "\uD83C\uDF4C", "\uD83C\uDF52", "\uD83D\uDCA6", "\uD83D\uDC49", "\uD83D\uDC4C", "\uD83D\uDD95"],
                    r = shallowRef({}),
                    c = () => {
                        if (a.isInitialized) return;
                        a.isInitialized = !0;
                        let e = "emoji-picker-data-v3",
                            t = null;
                        try {
                            let s = localStorage.getItem(e);
                            if (s) {
                                let n = JSON.parse(s);
                                n.timestamp && Date.now() - n.timestamp < 6048e5 && (t = n.emojis)
                            }
                        } catch (o) {}
                        d(t), a.loading = !1;
                        try {
                            let i = {};
                            Object.keys(r.value).forEach(e => {
                                "server" !== e && (i[e] = r.value[e])
                            }), localStorage.setItem(e, JSON.stringify({
                                timestamp: Date.now(),
                                emojis: i
                            }))
                        } catch (l) {}
                    },
                    d = t => {
                        let a = {};
                        e.discordAssets?.emojis?.length && (a.server = [], e.discordAssets.emojis.forEach((e, t) => {
                            a.server.push({
                                id: `server_${t}`,
                                name: e.name || `Server Emoji ${t}`,
                                native: `:${t}:`,
                                shortcodes: `:${t}:`,
                                keywords: [e.name || "", "server", "custom"].filter(Boolean),
                                src: e.url || e.src,
                                isCustom: !0
                            })
                        })), t ? Object.keys(t).forEach(e => {
                            a[e] = t[e]
                        }) : e.emojiData?.categories && e.emojiData?.emojis && e.emojiData.categories.forEach(t => {
                            let s = t.id;
                            i.value.find(e => e.id === s) && (a[s] = [], t.emojis?.length && t.emojis.forEach(t => {
                                let n = e.emojiData.emojis[t];
                                if (!n) return;
                                let o = n.skins?.[0];
                                o?.native && o?.unified && (l.includes(o.native) || a[s].push({
                                    id: t,
                                    name: n.name || t.replace(/_/g, " "),
                                    native: o.native,
                                    unified: o.unified,
                                    shortcodes: `:${t}:`,
                                    keywords: n.keywords || [],
                                    isCustom: !1
                                }))
                            }))
                        }), r.value = a
                    },
                    m = computed(() => e.discordAssets?.stickers ? e.discordAssets.stickers.map((e, t) => ({
                        id: `sticker_${t}`,
                        name: e.name,
                        src: e.url,
                        isSticker: !0
                    })) : []),
                    g = computed(() => m.value.length > 0),
                    p = computed(() => !0 === e.hasStickersPermission),
                    u = computed(() => !0 === e.hasServerEmojisPermission),
                    h = computed(() => r.value[a.activeCategory] || []),
                    f = computed(() => {
                        let e = h.value,
                            t = [],
                            s = Math.ceil(e.length / a.itemsPerRow);
                        for (let n = 0; n < s; n++) {
                            let o = n * a.itemsPerRow;
                            t.push({
                                index: n,
                                emojis: e.slice(o, o + a.itemsPerRow)
                            })
                        }
                        return t
                    }),
                    v = computed(() => {
                        let e = m.value,
                            t = [],
                            s = Math.ceil(e.length / a.stickerItemsPerRow);
                        for (let n = 0; n < s; n++) {
                            let o = n * a.stickerItemsPerRow;
                            t.push({
                                index: n,
                                stickers: e.slice(o, o + a.stickerItemsPerRow)
                            })
                        }
                        return t
                    }),
                    y = computed(() => {
                        if ("emojis" === a.currentTab) {
                            let e = f.value.length,
                                t = a.scrollTop,
                                s = a.containerHeight,
                                n = a.rowHeight;
                            return f.value.slice(Math.max(0, Math.floor(t / n) - 2), Math.min(e - 1, Math.ceil((t + s) / n) + 2) + 1).map(e => ({
                                ...e,
                                offsetY: e.index * n
                            }))
                        } {
                            let o = v.value.length,
                                i = a.scrollTop,
                                l = a.containerHeight,
                                r = a.stickerHeight;
                            return v.value.slice(Math.max(0, Math.floor(i / r) - 1), Math.min(o - 1, Math.ceil((i + l) / r) + 1) + 1).map(e => ({
                                ...e,
                                offsetY: e.index * r
                            }))
                        }
                    }),
                    C = computed(() => "emojis" === a.currentTab ? f.value.length * a.rowHeight + 80 : v.value.length * a.stickerHeight + 80);
                return watch(() => a.activeCategory, () => {
                    "emojis" === a.currentTab && (a.scrollTop = 0, n.value && (n.value.scrollTop = 0))
                }), onMounted(async () => {
                    e.emojiData && !a.isInitialized && ("requestIdleCallback" in window ? requestIdleCallback(() => {
                        c()
                    }, {
                        timeout: 100
                    }) : setTimeout(() => {
                        c()
                    }, 10)), !e.discordAssets?.emojis?.length && i.value.length > 0 && (a.activeCategory = "people")
                }), onUnmounted(() => {
                    a.scrollRAF && cancelAnimationFrame(a.scrollRAF), a.imageCache.clear()
                }), {
                    pickerRef: s,
                    scrollContainerRef: n,
                    ...toRefs(a),
                    categories: i,
                    currentCategoryEmojis: h,
                    visibleRows: y,
                    stickerRows: v,
                    stickers: m,
                    hasStickers: g,
                    canUseStickers: p,
                    canUseServerEmojis: u,
                    totalHeight: C,
                    selectEmoji(a) {
                        let s = {
                            ...a,
                            imageUrl: o(a)
                        };
                        e.onSelect ? e.onSelect(s) : t("select", s)
                    },
                    selectSticker(a) {
                        e.onSelect ? e.onSelect(a) : t("select", a)
                    },
                    getCategoryEmojiCount: e => r.value[e]?.length || 0,
                    getEmojiImageUrl: o,
                    handleScroll(e) {
                        a.scrollTop = e.target.scrollTop
                    },
                    changeTab(s) {
                        e.reactionMode && "stickers" === s || (a.currentTab = s, t("tabChange", s), a.scrollTop = 0, n.value && (n.value.scrollTop = 0))
                    }
                }
            },
            render: function(e, t) {
                return _openBlock(), _createElementBlock("div", {
                    ref: "pickerRef",
                    class: "emoji-picker-custom"
                }, [_createElementVNode("div", {
                    class: "emoji-picker-header"
                }, [_createElementVNode("div", {
                    class: "emoji-picker-tabs"
                }, [_createElementVNode("button", {
                    onClick: t => e.changeTab("emojis"),
                    class: _normalizeClass(["emoji-picker-tab", {
                        active: "emojis" === e.currentTab
                    }])
                }, " الإيموجيات ", 10, ["onClick"]), !e.reactionMode && e.hasStickers ? (_openBlock(), _createElementBlock("button", {
                    key: 0,
                    onClick: t => e.changeTab("stickers"),
                    class: _normalizeClass(["emoji-picker-tab", {
                        active: "stickers" === e.currentTab
                    }])
                }, [_createTextVNode(" ستكرز "), e.canUseStickers ? _createCommentVNode("v-if", !0) : (_openBlock(), _createElementBlock("span", {
                    key: 0,
                    class: "vip-badge-tab"
                }, "VIP"))], 10, ["onClick"])) : _createCommentVNode("v-if", !0)])]), _createCommentVNode(" Emoji Categories (only shown in emoji tab) "), "emojis" === e.currentTab ? (_openBlock(), _createElementBlock("div", {
                    key: 0,
                    class: "emoji-picker-categories"
                }, [(_openBlock(!0), _createElementBlock(_Fragment, null, _renderList(e.categories, t => (_openBlock(), _createElementBlock("button", {
                    key: t.id,
                    onClick: a => e.activeCategory = t.id,
                    class: _normalizeClass(["emoji-picker-category", {
                        active: e.activeCategory === t.id
                    }]),
                    title: t.name + " (" + e.getCategoryEmojiCount(t.id) + " ايموجي)"
                }, [t.emoji ? (_openBlock(), _createElementBlock("span", {
                    key: 0,
                    class: "category-emoji"
                }, _toDisplayString(t.emoji), 1)) : "server" === t.id ? (_openBlock(), _createElementBlock("i", {
                    key: 1,
                    class: "fa-solid fa-server"
                })) : _createCommentVNode("v-if", !0), "server" !== t.id || e.canUseServerEmojis ? _createCommentVNode("v-if", !0) : (_openBlock(), _createElementBlock("span", {
                    key: 2,
                    class: "vip-badge-category"
                }, "VIP"))], 10, ["onClick", "title"]))), 128))])) : _createCommentVNode("v-if", !0), _createElementVNode("div", {
                    class: "emoji-picker-content"
                }, [_createCommentVNode(" Loading Indicator "), e.loading && ("emojis" === e.currentTab || "stickers" === e.currentTab) ? (_openBlock(), _createElementBlock("div", {
                    key: 0,
                    class: "emoji-picker-loading"
                }, [_createElementVNode("i", {
                    class: "fa-solid fa-spinner fa-spin"
                }), _createElementVNode("p", null, "جاري تحميل الإيموجيات...")])) : _createCommentVNode("v-if", !0), _createCommentVNode(" Emojis Tab "), "emojis" !== e.currentTab || e.loading ? "stickers" !== e.currentTab || e.loading ? _createCommentVNode("v-if", !0) : (_openBlock(), _createElementBlock(_Fragment, {
                    key: 2
                }, [_createCommentVNode(" Stickers Tab "), _createElementVNode("div", {
                    ref: "scrollContainerRef",
                    class: "emoji-picker-scroll-container",
                    onScroll: e.handleScroll,
                    style: _normalizeStyle({
                        height: e.containerHeight + "px",
                        overflow: "auto",
                        position: "relative"
                    })
                }, [_createCommentVNode(" VIP Stickers Banner "), !e.canUseStickers && e.stickers.length > 0 ? (_openBlock(), _createElementBlock("div", {
                    key: 0,
                    class: "sticker-vip-banner"
                }, [_createElementVNode("div", {
                    class: "vip-banner-icon"
                }, [_createElementVNode("i", {
                    class: "fas fa-crown"
                })]), _createElementVNode("div", {
                    class: "vip-banner-content"
                }, [_createElementVNode("span", {
                    class: "vip-title"
                }, "ستكرز مميزة"), _createElementVNode("small", {
                    class: "vip-subtitle"
                }, "تبي تبرز بالشات؟ \uD83E\uDD29 أكثر من 10 ستكرز حصرية للـ VIP")]), _createElementVNode("div", {
                    class: "vip-shine"
                })])) : _createCommentVNode("v-if", !0), _createElementVNode("div", {
                    style: _normalizeStyle({
                        height: e.totalHeight + "px",
                        position: "relative"
                    })
                }, [(_openBlock(!0), _createElementBlock(_Fragment, null, _renderList(e.visibleRows, t => (_openBlock(), _createElementBlock("div", {
                    key: "sticker-row-" + t.index,
                    class: "sticker-picker-row",
                    style: _normalizeStyle({
                        position: "absolute",
                        top: t.offsetY + "px",
                        left: 0,
                        right: 0,
                        height: e.stickerHeight + "px",
                        display: "flex",
                        gap: "8px",
                        padding: "4px 8px",
                        justifyContent: "center"
                    })
                }, [(_openBlock(!0), _createElementBlock(_Fragment, null, _renderList(t.stickers, t => (_openBlock(), _createElementBlock("button", {
                    key: t.id,
                    onClick: a => e.selectSticker(t),
                    onMouseenter: a => e.hoveredSticker = t,
                    onMouseleave: t => e.hoveredSticker = null,
                    class: _normalizeClass(["sticker-picker-item", {
                        "sticker-restricted": !e.canUseStickers
                    }]),
                    title: e.canUseStickers ? t.name : "صلاحية الملصقات مطلوبة"
                }, [_createElementVNode("img", {
                    src: t.src,
                    alt: t.name,
                    class: "sticker-image",
                    style: _normalizeStyle(e.canUseStickers ? {} : {
                        filter: "grayscale(100%) brightness(0.7)",
                        opacity: "0.5"
                    })
                }, null, 12, ["src", "alt"])], 42, ["onClick", "onMouseenter", "onMouseleave", "title"]))), 128))], 4))), 128)), 0 === e.stickers.length ? (_openBlock(), _createElementBlock("div", {
                    key: 0,
                    class: "emoji-picker-no-results",
                    style: {
                        padding: "20px",
                        textAlign: "center"
                    }
                }, " No stickers available ")) : _createCommentVNode("v-if", !0)], 4)], 44, ["onScroll"])], 2112)) : (_openBlock(), _createElementBlock("div", {
                    key: 1,
                    ref: "scrollContainerRef",
                    class: "emoji-picker-scroll-container",
                    onScroll: e.handleScroll,
                    style: _normalizeStyle({
                        height: e.containerHeight + "px",
                        overflow: "auto",
                        position: "relative",
                        willChange: "scroll-position",
                        contain: "strict"
                    })
                }, [_createCommentVNode(" VIP Server Emojis Banner "), "server" === e.activeCategory && !e.canUseServerEmojis && e.currentCategoryEmojis.length > 0 ? (_openBlock(), _createElementBlock("div", {
                    key: 0,
                    class: "server-emoji-vip-banner"
                }, [_createElementVNode("div", {
                    class: "vip-banner-icon"
                }, [_createElementVNode("i", {
                    class: "fas fa-crown"
                })]), _createElementVNode("div", {
                    class: "vip-banner-content"
                }, [_createElementVNode("span", {
                    class: "vip-title"
                }, "إيموجيات مميزة"), _createElementVNode("small", {
                    class: "vip-subtitle"
                }, "تبي تزين كلامك بالشات؟ \uD83D\uDE0E إيموجيات خاصة للـ VIP بس")]), _createElementVNode("div", {
                    class: "vip-shine"
                })])) : _createCommentVNode("v-if", !0), _createElementVNode("div", {
                    style: _normalizeStyle({
                        height: e.totalHeight + "px",
                        position: "relative"
                    })
                }, [(_openBlock(!0), _createElementBlock(_Fragment, null, _renderList(e.visibleRows, t => (_openBlock(), _createElementBlock("div", {
                    key: "row-" + t.index + "-" + e.activeCategory,
                    class: "emoji-picker-row",
                    style: _normalizeStyle({
                        position: "absolute",
                        top: t.offsetY + "px",
                        left: 0,
                        right: 0,
                        height: e.rowHeight + "px",
                        display: "flex",
                        gap: "2px",
                        padding: "0 4px",
                        willChange: "transform",
                        transform: "translateZ(0)"
                    })
                }, [(_openBlock(!0), _createElementBlock(_Fragment, null, _renderList(t.emojis, t => (_openBlock(), _createElementBlock("button", {
                    key: t.id,
                    onClick: a => e.selectEmoji(t),
                    onMouseenter: a => e.hoveredEmoji = t,
                    onMouseleave: t => e.hoveredEmoji = null,
                    class: _normalizeClass(["emoji-picker-emoji", "emoji-picker-emoji-apple", {
                        "emoji-restricted": "server" === e.activeCategory && !e.canUseServerEmojis
                    }]),
                    title: "server" !== e.activeCategory || e.canUseServerEmojis ? t.name : "ميزة VIP مطلوبة",
                    style: _normalizeStyle({
                        width: "calc((100% - 14px) / " + e.itemsPerRow + ")",
                        height: "40px",
                        padding: "4px",
                        border: "none",
                        background: "transparent",
                        cursor: "pointer",
                        borderRadius: "6px",
                        transition: "background-color 0.15s ease",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        contain: "layout style paint"
                    })
                }, [_createElementVNode("img", {
                    src: e.getEmojiImageUrl(t),
                    alt: t.native,
                    class: "emoji-image",
                    loading: "lazy",
                    style: _normalizeStyle({
                        width: "28px",
                        height: "28px",
                        objectFit: "contain",
                        filter: "server" !== e.activeCategory || e.canUseServerEmojis ? "none" : "grayscale(90%) brightness(0.9) sepia(20%)",
                        opacity: "server" !== e.activeCategory || e.canUseServerEmojis ? "1" : "0.6"
                    }),
                    onError(e) {
                        e.target.style.display = "none", e.target.nextElementSibling.style.display = "inline"
                    }
                }, null, 44, ["src", "alt", "onError"]), _createElementVNode("span", {
                    class: "emoji-native-fallback",
                    style: {
                        display: "none",
                        "font-size": "24px"
                    }
                }, _toDisplayString(t.native), 1)], 46, ["onClick", "onMouseenter", "onMouseleave", "title"]))), 128))], 4))), 128)), _createCommentVNode(" No emojis in category "), 0 === e.currentCategoryEmojis.length ? (_openBlock(), _createElementBlock("div", {
                    key: 0,
                    class: "emoji-picker-no-results",
                    style: {
                        padding: "20px",
                        textAlign: "center"
                    }
                }, " No emojis in this category ")) : _createCommentVNode("v-if", !0)], 4)], 44, ["onScroll"]))]), _createCommentVNode(" Preview footer "), e.hoveredEmoji && "emojis" === e.currentTab ? (_openBlock(), _createElementBlock("div", {
                    key: 1,
                    class: "emoji-picker-preview"
                }, [_createElementVNode("span", {
                    class: "emoji-preview-emoji"
                }, [_createElementVNode("img", {
                    src: e.getEmojiImageUrl(e.hoveredEmoji),
                    alt: e.hoveredEmoji.native,
                    class: "emoji-preview-image"
                }, null, 8, ["src", "alt"])]), _createElementVNode("span", {
                    class: "emoji-preview-name"
                }, _toDisplayString(e.hoveredEmoji.name), 1), _createElementVNode("span", {
                    class: "emoji-preview-shortcode"
                }, _toDisplayString(e.hoveredEmoji.shortcodes), 1)])) : _createCommentVNode("v-if", !0), e.hoveredSticker && "stickers" === e.currentTab ? (_openBlock(), _createElementBlock("div", {
                    key: 2,
                    class: "emoji-picker-preview"
                }, [_createElementVNode("span", {
                    class: "emoji-preview-name"
                }, _toDisplayString(e.hoveredSticker.name), 1)])) : _createCommentVNode("v-if", !0)], 512)
            }
        }),
        t = defineComponent({
            props: {
                message: {
                    type: Object,
                    required: !0,
                    validator: e => e && "object" == typeof e
                },
                templates: {
                    type: Object,
                    default: () => ({})
                },
                userId: {
                    type: [String, Number],
                    default: null
                },
                storage: {
                    type: Object,
                    default: () => ({})
                },
                chat: {
                    type: Object,
                    default: () => ({})
                },
                currentChannel: {
                    type: String,
                    default: ""
                },
                onReply: {
                    type: Function,
                    default () {}
                },
                onReact: {
                    type: Function,
                    default () {}
                },
                onPin: {
                    type: Function,
                    default () {}
                },
                isPinned: {
                    type: Boolean,
                    default: !1
                },
                canPin: {
                    type: Boolean,
                    default: !1
                },
                emojiData: {
                    type: Object,
                    default: null
                },
                discordAssets: {
                    type: Object,
                    default: () => ({})
                },
                previousMessage: {
                    type: Object,
                    default: null
                },
                nextMessage: {
                    type: Object,
                    default: null
                },
                isSelected: {
                    type: Boolean,
                    default: !1
                }
            },
            setup(e, {
                emit: t
            }) {
                let a = e => {
                        if (!e) return "";
                        if (e.text) return e.text;
                        if (e.message) return e.message;
                        if (e.args && Array.isArray(e.args) && e.args.length > 0) {
                            let t = 0;
                            return t = 3 === e.args.length ? 2 : 2 === e.args.length ? 1 : 0, e.args[t] || ""
                        }
                        return ""
                    },
                    s = e => {
                        try {
                            return window.sharedEmojiData?.getAppleEmojiUrl?.(e) || null
                        } catch (t) {
                            return null
                        }
                    },
                    o = (e, t = {}) => {
                        let {
                            size: a = 20,
                            className: n = "emoji-apple",
                            forReply: o = !1
                        } = t, i = document.createElement("img"), l = s(e);
                        if (l) i.src = l;
                        else {
                            let r = e.codePointAt(0).toString(16).toLowerCase().padStart(4, "0");
                            i.src = `https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/${r}.png`
                        }
                        i.alt = e, i.className = o ? `${n} reply-emoji` : n, i.loading = "lazy";
                        let c = o ? 16 : a;
                        return i.style.cssText = `width: ${c}px; height: ${c}px; display: inline-block; vertical-align: ${o?"text-bottom":"middle"}; margin: ${o?"0 1px":"0 2px"};`, i.onerror = l || o ? function() {
                            this.style.display = "none"
                        } : function() {
                            let t = document.createTextNode(e);
                            this.replaceWith(t)
                        }, i
                    },
                    i = (e, t = {}) => {
                        try {
                            let a = e.textContent;
                            if (!a) return;
                            d.lastIndex = 0;
                            let s = 0,
                                n = [],
                                i;
                            for (; null !== (i = d.exec(a));) {
                                i.index > s && n.push(document.createTextNode(a.slice(s, i.index)));
                                let l = i[0],
                                    r = o(l, t);
                                n.push(r), s = i.index + i[0].length
                            }
                            s < a.length && n.push(document.createTextNode(a.slice(s))), n.length > 0 && ((e, t) => {
                                if (!e || !e.parentNode || !t.length) return;
                                let a = e.parentNode;
                                t.forEach(t => a.insertBefore(t, e)), a.removeChild(e)
                            })(e, n)
                        } catch (c) {}
                    },
                    l = (e, t = {}) => {
                        let {
                            excludeClasses: a = ["chat-emoji", "custom-emoji-msg"],
                            excludeTags: s = ["CODE"]
                        } = t, n = document.createTreeWalker(e, NodeFilter.SHOW_TEXT, {
                            acceptNode(e) {
                                let t = e.parentElement;
                                return t && (s.includes(t.tagName) || a.some(e => t.classList?.contains(e))) ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT
                            }
                        }), o = [], i;
                        for (; i = n.nextNode();) o.push(i);
                        return o
                    },
                    r = reactive({
                        imageUrls: [],
                        currentImageIndex: 0,
                        containsMention: !1,
                        edited: e.message?.edited || !1,
                        messageStickers: [],
                        hasTextContent: !0,
                        showFullTimestamp: !1,
                        isHovered: !1,
                        messageType: "text",
                        hasMultilineContent: !1,
                        processedContent: {
                            textContent: "",
                            hasEmojisOnly: !1
                        },
                        isProcessing: !1,
                        errors: {
                            stickers: new Map,
                            images: new Map,
                            processing: null
                        },
                        pollData: null,
                        hasVoted: !1,
                        selectedOption: null,
                        pollTimeRemaining: 0,
                        imageModal: {
                            isOpen: !1,
                            imageSrc: "",
                            imageAlt: "",
                            isClosing: !1
                        }
                    }),
                    c = /(https?:\/\/[^\s]+\.(?:png|jpg|gif|jpeg|webp)(?:\?[^\s]*)?)/gi,
                    d = /\p{Emoji_Presentation}|\p{Emoji}\uFE0F/gu,
                    m = e => {
                        try {
                            if (!e) return "غير معروف";
                            if (e.author) return String(e.author);
                            if (e.args && Array.isArray(e.args)) {
                                if (e.args[0]) return String(e.args[0]);
                                if (e.args[1]) return String(e.args[1])
                            }
                            return "غير معروف"
                        } catch (t) {
                            return "غير معروف"
                        }
                    };
                class g {
                    constructor(e) {
                        this.maxSize = e, this.cache = new Map
                    }
                    get(e) {
                        if (!this.cache.has(e)) return;
                        let t = this.cache.get(e);
                        return this.cache.delete(e), this.cache.set(e, t), t
                    }
                    set(e, t) {
                        if (this.cache.has(e)) this.cache.delete(e);
                        else if (this.cache.size >= this.maxSize) {
                            let a = this.cache.keys().next().value;
                            this.cache.delete(a)
                        }
                        this.cache.set(e, t)
                    }
                    clear() {
                        this.cache.clear()
                    }
                }
                let p = new g(50),
                    u = new g(100),
                    h = e => {
                        try {
                            if (!e) return "unknown";
                            let t = p.get(e);
                            if (t) return t;
                            let a = "unknown";
                            if (e.gId && "string" == typeof e.gId) {
                                let s = e.gId.split("_");
                                s.length >= 2 && /^\d+$/.test(s[1]) && (a = s[1])
                            } else e.author && (a = String(e.author));
                            return p.set(e, a), a
                        } catch (n) {
                            return "unknown"
                        }
                    },
                    f = (e, t = !0) => {
                        try {
                            return "string" != typeof e ? String(e || "") : (e = (e = (e = e.replace(/\r\n/g, "\n").replace(/\r/g, "\n")).replace(/^\n+/, "")).replace(/\n+$/, ""), e = t ? e.replace(/\n{2,}/g, "\n") : e.replace(/\n/g, " "))
                        } catch (a) {
                            return e
                        }
                    },
                    v = e => {
                        try {
                            return "string" != typeof e ? String(e || "") : e = (e = (e = (e = e.replace(/(<br\s*\/?>){2,}/gi, "<br>")).replace(/^(\s*<br\s*\/?>)+/gi, "")).replace(/(<br\s*\/?>)+\s*$/gi, "")).replace(/(\n|<br\s*\/?>)(\s*(\n|<br\s*\/?>))+/gi, "<br>")
                        } catch (t) {
                            return e
                        }
                    },
                    y = t => {
                        try {
                            "string" != typeof t && (t = String(t || "")), t = f(t);
                            let a = [];
                            if (e.message?.sticker && e.message.sticker.url) {
                                let s = e.message.sticker.url;
                                if (s.startsWith("../") || s.startsWith("./") || !s.includes("://")) a.push({
                                    index: 0,
                                    url: s,
                                    code: e.message.sticker.shortcode || ":sticker:",
                                    name: e.message.sticker.name || "Sticker"
                                });
                                else try {
                                    new URL(s), a.push({
                                        index: 0,
                                        url: s,
                                        code: e.message.sticker.shortcode || ":sticker:",
                                        name: e.message.sticker.name || "Sticker"
                                    })
                                } catch {
                                    a.push({
                                        index: 0,
                                        url: s,
                                        code: e.message.sticker.shortcode || ":sticker:",
                                        name: e.message.sticker.name || "Sticker"
                                    })
                                }
                            }
                            let n = t.trim(),
                                o = "text";
                            return a.length > 0 && (o = n ? "mixed" : "sticker-only"), {
                                type: o,
                                stickers: a,
                                textContent: n,
                                hasEmojisOnly: !1
                            }
                        } catch (i) {
                            return {
                                type: "text",
                                stickers: [],
                                textContent: String(t || ""),
                                hasEmojisOnly: !1
                            }
                        }
                    },
                    C = (e, t) => computed(() => {
                        try {
                            return e()
                        } catch (a) {
                            return t
                        }
                    }),
                    k = document.createElement("div"),
                    E = e => ("string" != typeof e && (e = String(e || "")), k.textContent = e, k.innerHTML),
                    $ = C(() => e.storage?.transition || "animate__pulse", "animate__pulse"),
                    b = C(() => Boolean(e.storage?.hideAvatars), !1),
                    N = C(() => e.message?.reactions || {}, {}),
                    V = C(() => Object.keys(N.value).length > 0, !1),
                    I = C(() => h(e.message), "unknown"),
                    M = e => {
                        try {
                            return e?.gId && "string" == typeof e.gId && e.gId.trim().length > 0
                        } catch (t) {
                            return errorHandler(t, "hasValidMessageId"), !1
                        }
                    },
                    _ = C(() => I.value === String(e.userId), !1),
                    w = C(() => {
                        if (window.GroupingCache) return window.GroupingCache.shouldGroup(e.message, e.previousMessage, e.storage);
                        if (e.message?.forceUngrouped || !e.previousMessage || !e.storage?.enableMessageGrouping || !M(e.message) || !M(e.previousMessage)) return !1;
                        let t = I.value;
                        if (t !== h(e.previousMessage) || "unknown" === t || e.message.channel !== e.previousMessage.channel || e.previousMessage.edited) return !1;
                        let a = parseInt(e.message.timestamp) || Date.now(),
                            s = parseInt(e.previousMessage.timestamp) || Date.now();
                        return Math.abs(a - s) <= (e.storage?.groupingTimeWindow || 3e5) && a >= s
                    }, !1),
                    T = (() => {
                        let e = {
                                b: [],
                                i: [],
                                u: [],
                                s: [],
                                code: [],
                                br: [],
                                span: ["class", "style"],
                                img: ["src", "alt", "class", "style", "loading", "onerror"]
                            },
                            t = ["mention", "spoiler", "revealed", "link", "chat-emoji", "chat-emoji-apple", "emoji-apple", "custom-emoji-msg", "reply-emoji", "reply-content-text", "reply-empty", "only-msg", "msg-title", "message-edited", "reply-author-inline", "reply-sticker-only", "reply-media-indicator", "reply-sticker-indicator", "reply-error", "error-message", "color-0", "color-1", "color-2", "color-3", "color-4", "color-5", "color-6", "color-7", "color-8", "color-9"],
                            a = ["https:", "http:"];
                        return s => {
                            try {
                                let n = document.createElement("div");
                                n.innerHTML = s, n.querySelectorAll("script, iframe, object, embed, form, input, textarea, button").forEach(e => e.remove());
                                let o = n.querySelectorAll("*");
                                for (let i of o) {
                                    let l = i.tagName.toLowerCase();
                                    if (!e.hasOwnProperty(l)) {
                                        let r = i.textContent,
                                            c = document.createTextNode(r);
                                        i.parentNode.replaceChild(c, i);
                                        continue
                                    }
                                    let d = e[l],
                                        m = [...i.attributes];
                                    for (let g of m) {
                                        let p = g.name.toLowerCase();
                                        if (p.startsWith("on")) i.removeAttribute(g.name);
                                        else if (d.includes(p)) {
                                            if ("class" === p) {
                                                let u = g.value.split(/\s+/).filter(e => t.includes(e));
                                                u.length > 0 ? i.className = u.join(" ") : i.removeAttribute("class")
                                            }
                                            if ("style" === p) {
                                                if ("span" === l) {
                                                    let h = g.value.trim(),
                                                        f = [/^color:\s*rgb\(\d{1,3},\s*\d{1,3},\s*\d{1,3}\)$/i, /^--reply-color-rgb:\s*\d{1,3},\s*\d{1,3},\s*\d{1,3}$/i, /^--msg-color-rgb:\s*\d{1,3},\s*\d{1,3},\s*\d{1,3}$/i];
                                                    ["msg-title", "reply-author-inline"].some(e => i.classList.contains(e)) && f.some(e => e.test(h)) || i.removeAttribute("style")
                                                } else "img" === l && (i.classList.contains("custom-emoji-msg") || i.classList.contains("emoji-apple") || i.classList.contains("chat-emoji") || i.classList.contains("reply-emoji")) || i.removeAttribute("style")
                                            }
                                            if ("src" === p && "img" === l) {
                                                let y = g.value;
                                                if (y.startsWith("../") || y.startsWith("./") || y.startsWith("/") || !y.includes("://"));
                                                else try {
                                                    let C = new URL(y);
                                                    a.includes(C.protocol) || i.removeAttribute("src")
                                                } catch {
                                                    i.removeAttribute("src")
                                                }
                                            }
                                        } else i.removeAttribute(g.name)
                                    }
                                    for (let k of i.attributes) k.value.match(/^\s*(?:javascript|data):/i) && i.removeAttribute(k.name)
                                }
                                let $ = n.innerHTML;
                                return $ = v($)
                            } catch (b) {
                                return E(s)
                            }
                        }
                    })(),
                    S = t => {
                        try {
                            "string" != typeof t && (t = String(t || ""));
                            let a = t = f(t),
                                s = new Map,
                                n = 0,
                                o = /@(everyone|here|-?\d+)(?!\w)/g,
                                i;
                            for (window.MentionService && e.message && window.MentionService.updateKnownUsers([e.message]); null !== (i = o.exec(t));) {
                                let l = i[1];
                                if (/^-?\d+$/.test(l) || ["everyone", "here"].includes(l)) {
                                    let c = `M${n++}`;
                                    if (window.MentionService) {
                                        let d = window.MentionService.createMentionElement(l, e.userId, {
                                            showName: !1
                                        });
                                        s.set(c, d)
                                    } else s.set(c, `<span class="mention">@${l}</span>`);
                                    let m = l.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
                                    a = a.replace(RegExp(`@${m}(?!\\w)`, "g"), c);
                                    let g = String(e.userId || ""),
                                        p = l.replace(/^-/, ""),
                                        u = g.replace(/^-/, "");
                                    "everyone" !== l && "here" !== l && p !== u || (e.storage?.isMuted || (e.message, e.currentChannel), r.containsMention = !0)
                                }
                            }
                            let h = a.replace(/\[spoiler\]([\s\S]*?)\[\/spoiler\]/gi, "$1").replace(/\[spiler\]([\s\S]*?)\[\/spiler\]/gi, "$1").replace(/\[b\]([\s\S]*?)\[\/b\]/gi, "$1").replace(/\[i\]([\s\S]*?)\[\/i\]/gi, "$1").replace(/\[u\]([\s\S]*?)\[\/u\]/gi, "$1").replace(/\[s\]([\s\S]*?)\[\/s\]/gi, "$1").replace(/\[code\]([\s\S]*?)\[\/code\]/gi, "$1");
                            for (let [v, y] of(h = (h = (h = E(h)).replace(/\uE010([\s\S]*?)\uE011/g, '<span class="spoiler">$1</span>').replace(/\uE012([\s\S]*?)\uE013/g, "<b>$1</b>").replace(/\uE014([\s\S]*?)\uE015/g, "<i>$1</i>").replace(/\uE016([\s\S]*?)\uE017/g, "<u>$1</u>").replace(/\uE018([\s\S]*?)\uE019/g, "<s>$1</s>").replace(/\uE01A([\s\S]*?)\uE01B/g, "<code>$1</code>").replace(/\*\*\*\*/g, "\x01").replace(/\*\*([^*]+)\*\*/g, "<b>$1</b>").replace(/\u0001/g, "**").replace(/____/g, "\x02").replace(/__([^_]+)__/g, "<u>$1</u>").replace(/\u0002/g, "__").replace(/~~~~/g, "\x03").replace(/~~([^~]+)~~/g, "<s>$1</s>").replace(/\u0003/g, "~~").replace(/\|\|\|\|/g, "\x04").replace(/\|\|([^|]+)\|\|/g, '<span class="spoiler">$1</span>').replace(/\u0004/g, "||").replace(/(?<!\*)\*(?!\*)([^*]+)(?<!\*)\*(?!\*)/g, "<i>$1</i>").replace(/``/g, "\x05").replace(/`([^`]+)`/g, "<code>$1</code>").replace(/\u0005/g, "`")).replace(/\n/g, "<br>"), s)) h = h.split(v).join(y);
                            return T(h)
                        } catch (C) {
                            return E(String(t || ""))
                        }
                    },
                    x = (e, t = "short") => {
                        try {
                            if (e instanceof Date || (e = new Date(parseInt(e) || Date.now())), isNaN(e.getTime()) && (e = new Date), "short" === t) {
                                let a = e.getHours() % 12 || 12,
                                    s = e.getMinutes().toString().padStart(2, "0");
                                return `${a}:${s} ${e.getHours()>=12?"PM":"AM"}`
                            } {
                                let n = new Date,
                                    o = new Date(n),
                                    i;
                                o.setDate(o.getDate() - 1), i = e.toDateString() === n.toDateString() ? "Today at" : e.toDateString() === o.toDateString() ? "Yesterday at" : e.toLocaleDateString();
                                let l = e.getHours() % 12 || 12,
                                    r = e.getMinutes().toString().padStart(2, "0");
                                return `${i} ${l}:${r} ${e.getHours()>=12?"PM":"AM"}`
                            }
                        } catch (c) {
                            return "Unknown time"
                        }
                    },
                    P = () => {
                        try {
                            if (r.imageModal.isClosing) return;
                            r.imageModal.isClosing = !0, setTimeout(() => {
                                r.imageModal.isOpen = !1, r.imageModal.isClosing = !1, r.imageModal.imageSrc = "", r.imageModal.imageAlt = ""
                            }, 200), document.removeEventListener("keydown", D)
                        } catch (e) {}
                    },
                    D = e => {
                        "Escape" === e.key && r.imageModal.isOpen && !r.imageModal.isClosing && P()
                    },
                    B = new Map,
                    j = null,
                    A = null,
                    R = null,
                    L = null,
                    U = computed(() => {
                        if ("poll" === e.message?.type) return r.messageType = "poll", r.pollData = e.message.pollData || {}, r.hasVoted = r.pollData.voters?.includes(e.userId) || !1, r.pollTimeRemaining = r.pollData.timeRemaining || r.pollData.duration || 0, r.pollData.options || (r.pollData.options = []), void 0 === r.pollData.totalVotes && (r.pollData.totalVotes = 0), "";
                        try {
                            let t = e.message?.gId || e.message?.templateId,
                                a = w.value,
                                s = r.edited;
                            if (A === t && R === a && L === s && null !== j) return j;
                            let n = `${t}-${s}-${a}`,
                                o = u.get(n);
                            if (o) return A = t, R = a, L = s, j = o, o;
                            let i = e.message?.template || e.templates?.[e.message?.templateId] || e.templates?.default || "{0}: {1}";
                            1 === e.message?.args?.length ? i = e.templates?.defaultAlt || "{0}" : 3 === e.message?.args?.length ? i = '{0} <span class="only-msg">{2}</span>' : 2 !== e.message?.args?.length || e.message.args[0] && "" !== e.message.args[0] ? 2 !== e.message?.args?.length || e.message.args[1] && "" !== e.message.args[1] || (i = "{0}") : i = "{1}", i = i.replace(/{(\d+)}/g, (t, a) => {
                                let s = parseInt(a);
                                if (isNaN(s) || !e.message?.args || s >= e.message.args.length) return "";
                                let n = e.message.args[s],
                                    o = 1 === s && 2 === e.message.args.length || 2 === s && 3 === e.message.args.length;
                                o && "string" == typeof n && (n = f(n));
                                let i = o ? (e => {
                                    "string" != typeof e && (e = String(e || ""));
                                    let t = E(e);
                                    for (let [a, s] of [
                                            [/\[b\](.*?)\[\/b\]/g, "<b>$1</b>"],
                                            [/\[i\](.*?)\[\/i\]/g, "<i>$1</i>"],
                                            [/\[u\](.*?)\[\/u\]/g, "<u>$1</u>"],
                                            [/\[s\](.*?)\[\/s\]/g, "<s>$1</s>"],
                                            [/\[code\](.*?)\[\/code\]/g, "<code>$1</code>"]
                                        ]) t = t.replace(a, s);
                                    return t
                                })(n) : E(n);
                                if (0 === s && w.value) return "";
                                if (0 === s) {
                                    let l = e.message?.args?.[1] || "",
                                        r = f(l).includes("\n"),
                                        c = "";
                                    l && "" !== l.trim() && (c = r && !w.value ? ":<br>" : ":");
                                    let d = e.message?.color || e.message?.customColor;
                                    return d ? `${F(i,d)}${c}` : e.message?.nameAnimation && "none" !== e.message.nameAnimation ? `<span class="msg-title name-animation-${e.message.nameAnimation}">${i}</span>${c}` : `${i}${c}`
                                }
                                return i
                            }), w.value && (i = i.replace(/^:\s*/, "")), i = "sticker-only" !== r.messageType || w.value ? "sticker-only" === r.messageType && w.value ? "" : i.replace(/<span class="only-msg">(.*?)<\/span>/g, ' <span class="only-msg">$1</span>') : i.replace(/<span class="only-msg">(.*?)<\/span>/g, "");
                            let l = O(i, e, r);
                            return u.set(n, l), A = t, R = a, L = s, j = l, l
                        } catch (c) {
                            return console.error("Error in textEscaped:", c), '<span class="error-message">Error rendering message</span>'
                        }
                    }),
                    F = (t, a) => {
                        try {
                            let s, n, o, i = "";
                            if (e.message?.nameAnimation && "none" !== e.message.nameAnimation && (i = ` name-animation-${e.message.nameAnimation}`), Array.isArray(a) && a.length >= 3)[s, n, o] = a.map(e => Math.min(255, Math.max(0, parseInt(e) || 0)));
                            else {
                                if ("string" != typeof a || !a.includes("rgb")) return `<span class="msg-title${i}">${t}</span>`;
                                {
                                    let l = a.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
                                    if (!l) return `<span class="msg-title${i}">${t}</span>`;
                                    s = Math.min(255, Math.max(0, parseInt(l[1]) || 0)), n = Math.min(255, Math.max(0, parseInt(l[2]) || 0)), o = Math.min(255, Math.max(0, parseInt(l[3]) || 0))
                                }
                            }
                            return `<span class="msg-title${i}" style="color: rgb(${s}, ${n}, ${o})">${t}</span>`
                        } catch (r) {
                            return t
                        }
                    },
                    O = (e, t, a) => {
                        try {
                            if ("poll" === t.message?.type) return a.isProcessing = !1, a.messageType = "poll", a.pollData = t.message.pollData || {}, a.hasVoted = a.pollData.voters?.includes(t.userId) || !1, a.pollTimeRemaining = a.pollData.timeRemaining || a.pollData.duration || 0, a.pollData.options || (a.pollData.options = []), void 0 === a.pollData.totalVotes && (a.pollData.totalVotes = 0), "";
                            a.isProcessing = !0;
                            let s = (e => {
                                if (!e?.args || e.args.length < 2) return !1;
                                let t = 3 === e.args.length ? 2 : 1,
                                    a = String(e.args[t] || "");
                                return f(a).includes("\n")
                            })(t.message) && !w.value;
                            a.hasMultilineContent = s;
                            let n = "<span>" + e.replace(/\^([0-9])/g, (e, t) => `</span><span class="color-${t}">`) + "</span>";
                            n = n.replace(/<span[^>]*><\/span>/g, "");
                            let o = document.createElement("div");
                            o.innerHTML = n;
                            let i = o.querySelector(".only-msg"),
                                l = "";
                            if (i) {
                                let r = i.innerHTML.includes("<b>") || i.innerHTML.includes("<i>") || i.innerHTML.includes("<u>") || i.innerHTML.includes("<s>") || i.innerHTML.includes("<code>");
                                l = r ? i.innerHTML : i.textContent || ""
                            }
                            l = f(l);
                            let c = y(l);
                            a.messageType = c.type, a.messageStickers = c.stickers.slice(0, 1), a.hasTextContent = !!c.textContent, a.processedContent = {
                                textContent: c.textContent,
                                hasEmojisOnly: c.hasEmojisOnly
                            }, "poll" !== a.messageType && y(l).stickers.forEach(e => {
                                l = l.replace(RegExp(e.code.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g"), "")
                            });
                            let d;
                            if (l = l.trim(), G.length > 0 && (G.forEach(e => {
                                    n = n.replace(e, ""), l = l.replace(e, "")
                                }), "" === l.trim() && (l = " ", a.hasTextContent = !0)), d = l.includes("<b>") || l.includes("<i>") || l.includes("<u>") || l.includes("<s>") || l.includes("<code>") ? (d = (d = l).replace(/\[spoiler\]([\s\S]*?)\[\/spoiler\]/gi, '<span class="spoiler">$1</span>').replace(/\[spiler\]([\s\S]*?)\[\/spiler\]/gi, '<span class="spoiler">$1</span>').replace(/\[b\]([\s\S]*?)\[\/b\]/gi, "<b>$1</b>").replace(/\[i\]([\s\S]*?)\[\/i\]/gi, "<i>$1</i>").replace(/\[u\]([\s\S]*?)\[\/u\]/gi, "<u>$1</u>").replace(/\[s\]([\s\S]*?)\[\/s\]/gi, "<s>$1</s>").replace(/\[code\]([\s\S]*?)\[\/code\]/gi, "<code>$1</code>")).replace(/@(everyone|here|-?\d+)(?!\w)/g, (e, a) => window.MentionService ? window.MentionService.createMentionElement(a, t.userId, {
                                    showName: !1
                                }) : `<span class="mention">@${a}</span>`) : S(l), t.chat?.Settings?.Filter?.Links && t.chat?.Settings?.Filter?.Links.Enabled && t.message?.isImageAndLinksAllowed?.[1] && a.hasTextContent && (d = d.replace(/(https?:\/\/[^\s<]+)/gi, e => {
                                    if (G.includes(e)) return "";
                                    if (!e.includes("://")) return E(e);
                                    try {
                                        return new URL(e), `<span class="link">${E(e)}</span>`
                                    } catch {
                                        return E(e)
                                    }
                                })), t.message?.gId) {
                                t.message.gId.split("_")[1];
                                let m = n;
                                i ? (i.innerHTML = d, c.stickers.forEach(e => {
                                    let t = RegExp(e.code.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g");
                                    i.innerHTML = i.innerHTML.replace(t, "")
                                }), m = o.innerHTML) : (m = n.replace(l, d), c.stickers.forEach(e => {
                                    let t = RegExp(e.code.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g");
                                    m = m.replace(t, "")
                                })), m = v(m), s && (m = z(m, t, a)), n = H(m.trim(), t.chat, !1, a.messageStickers)
                            } else {
                                let g = n.replace(l, d);
                                c.stickers.forEach(e => {
                                    let t = RegExp(e.code.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g");
                                    g = g.replace(t, "")
                                }), g = v(g), s && (g = z(g, t, a)), n = H(g.trim(), t.chat, !1, a.messageStickers)
                            }
                            return a.isProcessing = !1, n
                        } catch (p) {
                            return console.error("Error in colorize:", p), a.isProcessing = !1, a.errors.processing = p.message, '<span class="error-message">Error processing message</span>'
                        }
                    },
                    z = (e, t, a) => {
                        try {
                            let s = document.createElement("div");
                            s.innerHTML = e;
                            let n = s.querySelector(".msg-title"),
                                o = s.querySelector(".only-msg"),
                                i = s.querySelector(".message-edited");
                            if (!n || !o) return e;
                            let l = document.createElement("div");
                            l.className = "message-multiline";
                            let r = document.createElement("div");
                            r.className = "message-multiline-header";
                            let c = n.cloneNode(!0);
                            c.textContent.endsWith(":") || (c.textContent += ":"), r.appendChild(c);
                            let d = document.createElement("div");
                            d.className = "message-multiline-content", a.containsMention && d.classList.add("mention-bg");
                            let m = o.cloneNode(!0);
                            return d.appendChild(m), i && d.appendChild(i.cloneNode(!0)), l.appendChild(r), l.appendChild(d), l.outerHTML
                        } catch (g) {
                            return e
                        }
                    },
                    H = (t, a, s = !1, n = null) => {
                        try {
                            "string" != typeof t && (t = String(t || ""));
                            let o = a?.Settings?.Filter?.Emojis || [];
                            if (o.length > 0) {
                                let r = new Map;
                                if (o.forEach((e, t) => {
                                        if (e && "string" == typeof e) {
                                            let a = e;
                                            e.startsWith("http") || e.startsWith("//") || (a = `../../emojis/${e}`), r.set(`:${t}:`, a)
                                        }
                                    }), r.size > 0) {
                                    let c = RegExp(Array.from(r.keys()).map(e => e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|"), "g");
                                    t = t.replace(c, e => {
                                        let t = r.get(e);
                                        return s ? "\uD83D\uDE0A" : `<img class="custom-emoji-msg" src="${t}" alt="${e}" loading="lazy" onerror="this.style.display='none'" style="width: 20px; height: 20px; display: inline-block; vertical-align: middle; margin: 0 2px;" />`
                                    })
                                }
                            }
                            if (s && n && n.length > 0 && (t += " [Sticker]"), e.emojiData && !s) {
                                let d = document.createElement("div");
                                d.innerHTML = t;
                                let m = l(d, {
                                    excludeClasses: ["chat-emoji"]
                                });
                                for (let g = m.length - 1; g >= 0; g -= 10) m.slice(Math.max(0, g - 10 + 1), g + 1).forEach(e => {
                                    i(e, {
                                        size: 20
                                    })
                                });
                                t = d.innerHTML
                            }
                            return t
                        } catch (p) {
                            return t
                        }
                    },
                    q = null,
                    W = computed(() => {
                        let e = ["message-layout", `layout-${r.messageType}`];
                        return r.messageStickers.length > 1 && e.push("has-multiple-stickers"), w.value && e.push("grouped-layout"), r.isProcessing && e.push("is-processing"), r.errors.processing && e.push("has-error"), r.hasMultilineContent && e.push("has-multiline"), e.join(" ")
                    }),
                    G = (() => {
                        if ("poll" === e.message?.type) return [];
                        let t = [];
                        if (e.message?.images && Array.isArray(e.message.images)) {
                            let a = e.message.images.filter(e => e && e.url).map(e => e.url).slice(0, 5);
                            t.push(...a)
                        }
                        if (t.length < 5 && e.chat?.Settings?.Filter?.Images?.Enabled && e.message?.isImageAndLinksAllowed?.[0]) {
                            let s = "";
                            if (3 === e.message?.args?.length ? s = String(e.message.args[2] || "") : 2 === e.message?.args?.length ? s = String(e.message.args[1] || "") : 1 === e.message?.args?.length && (s = String(e.message.args[0] || "")), s) {
                                c.lastIndex = 0;
                                let n = [...s.matchAll(c)].map(e => e[0]),
                                    o = 5 - t.length;
                                t.push(...n.slice(0, o))
                            }
                        }
                        return t
                    })();
                G.length > 0 && (r.imageUrls = [...G], r.extractedImageUrls = [...G]), r.contentInitialized = !0, watchEffect(() => {
                    G.length > 0 && 0 === r.imageUrls.length && (r.imageUrls = [...G])
                }), onMounted(() => {
                    (() => {
                        try {
                            window.eventBus && "function" == typeof window.eventBus.on && (q = window.eventBus.on("message-edited", t => {
                                try {
                                    t?.detail?.gId && e.message?.gId === t.detail.gId && (r.edited = !0)
                                } catch (a) {}
                            })), nextTick(() => {
                                document.addEventListener("click", e => {
                                    let t = e.target.closest(".spoiler");
                                    t && (e.preventDefault(), e.stopPropagation(), t.classList.toggle("revealed"))
                                })
                            })
                        } catch (t) {}
                    })()
                }), onUnmounted(() => {
                    try {
                        if (K && (clearInterval(K), K = null), q && "function" == typeof q && q(), u.clear(), p.clear(), B.clear(), r.errors.stickers.clear(), r.errors.images.clear(), n.clear(), window.requestAnimationFrame) {
                            let e = window.requestAnimationFrame(() => {});
                            for (; e--;) window.cancelAnimationFrame(e)
                        }
                        k.innerHTML = "", r.messageStickers = []
                    } catch (t) {}
                });
                let K = null,
                    Q = () => {
                        K && clearInterval(K), r.pollData && r.pollData.active && r.pollTimeRemaining > 0 && (K = setInterval(() => {
                            r.pollTimeRemaining > 0 ? r.pollTimeRemaining-- : (clearInterval(K), K = null, r.pollData.active = !1)
                        }, 1e3))
                    };
                onMounted(() => {
                    if ("poll" === e.message?.type || e.message?.isPoll || e.message?.pollData) {
                        r.messageType = "poll", r.pollData = e.message.pollData || {};
                        let t = String(e.userId || "");
                        r.pollData.voters ? Array.isArray(r.pollData.voters) ? r.hasVoted = r.pollData.voters.includes(t) || r.pollData.voters.includes(e.userId) : "object" == typeof r.pollData.voters && (r.hasVoted = void 0 !== r.pollData.voters[t] || void 0 !== r.pollData.voters[e.userId], r.hasVoted && (r.selectedOption = r.pollData.voters[t] || r.pollData.voters[e.userId])) : r.hasVoted = !1, r.pollTimeRemaining = r.pollData.timeRemaining || 0, r.errors.processing = null, r.isProcessing = !1, r.pollData.options || (r.pollData.options = []), void 0 === r.pollData.totalVotes && (r.pollData.totalVotes = 0), r.pollData.active && r.pollTimeRemaining > 0 && Q()
                    }
                });
                let Y = !1;
                watch(() => e.message?.pollData, (t, a) => {
                    if (!t) return;
                    r.messageType = "poll", r.pollData = {
                        ...t
                    };
                    let s = String(e.userId || "");
                    t.voters && (Array.isArray(t.voters) ? r.hasVoted = t.voters.includes(s) || t.voters.includes(e.userId) : "object" == typeof t.voters && (r.hasVoted = void 0 !== t.voters[s] || void 0 !== t.voters[e.userId], r.hasVoted && (r.selectedOption = t.voters[s] || t.voters[e.userId]))), r.pollData.options || (r.pollData.options = []), void 0 === r.pollData.totalVotes && (r.pollData.totalVotes = 0), !Y && t.active && t.timeRemaining > 0 ? (r.pollTimeRemaining = t.timeRemaining, Q(), Y = !0) : !t.active && K && (clearInterval(K), K = null, Y = !1)
                }, {
                    immediate: !0,
                    deep: !0
                }), watch(() => e.message?.lastUpdate, () => {
                    e.message?.pollData && (r.pollData = {
                        ...e.message.pollData
                    })
                });
                let Z = computed(() => {
                        let t = r.pollData || e.message?.pollData;
                        return t && t.active ? `${Math.floor(r.pollTimeRemaining/60)}:${(r.pollTimeRemaining%60).toString().padStart(2,"0")}` : ""
                    }),
                    J = computed(() => {
                        let t = r.pollData || e.message?.pollData;
                        return !(!t || !t.totalVotes) && t.totalVotes > 0
                    });
                return watchEffect(() => {
                    r.imageUrls.length > 0 || e.message?.args?.[2]?.includes("http")
                }), {
                    ...toRefs(r),
                    myAnimation: $,
                    hideAvatars: b,
                    messageReactions: N,
                    hasReactions: V,
                    messageUserId: I,
                    isOwnMessage: _,
                    isGrouped: w,
                    messageLayoutClass: W,
                    textEscaped: U,
                    handleMouseEnter() {
                        try {
                            r.isHovered = !0
                        } catch (e) {}
                    },
                    handleMouseLeave() {
                        try {
                            r.isHovered = !1, r.showFullTimestamp = !1
                        } catch (e) {}
                    },
                    getMessageStyle() {
                        try {
                            let t = {};
                            if (e.message?.color && Array.isArray(e.message.color) && e.message.color.length >= 3) {
                                let [a, s, n] = e.message.color.map(e => Math.min(255, Math.max(0, parseInt(e) || 0)));
                                t["--msg-color-rgb"] = `${a}, ${s}, ${n}`
                            }
                            return e.message?.cosmetics?.background ? (t.backgroundImage = `url(${e.message.cosmetics.background})`, t.backgroundSize = "cover", t.backgroundPosition = "center", t.backgroundRepeat = "no-repeat") : e.message?.bgColor && (t.background = e.message.bgColor), t
                        } catch (o) {
                            return {}
                        }
                    },
                    getMessageGradientStyle() {
                        try {
                            let t = {};
                            if (e.message?.customColor) {
                                let a = (e => {
                                    if (!e || "string" != typeof e) return null;
                                    let t = e.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
                                    return t ? {
                                        r: parseInt(t[1]),
                                        g: parseInt(t[2]),
                                        b: parseInt(t[3])
                                    } : null
                                })(e.message.customColor);
                                a && (t["--gradient-color-strong"] = `rgba(${a.r}, ${a.g}, ${a.b}, 0.5)`, t["--gradient-color-weak"] = `rgba(${a.r}, ${a.g}, ${a.b}, 0.1)`)
                            }
                            return t
                        } catch (s) {
                            return {}
                        }
                    },
                    getAuthorName: m,
                    processReplyText(t) {
                        try {
                            if (!t || "object" != typeof t) return "";
                            let s = m(t),
                                n = "";
                            if (t.fullText) n = String(t.fullText);
                            else if (t.originalText) n = String(t.originalText);
                            else if (t.text) {
                                if ((n = String(t.text)).endsWith("...") || n.includes("...") && n.length < 60) {
                                    let o = a(t);
                                    o && o.length > n.length && (n = String(o))
                                }
                            } else n = String(a(t));
                            if (n.includes('<span class="only-msg">')) {
                                let r = document.createElement("div");
                                r.innerHTML = n;
                                let d = r.querySelector(".only-msg");
                                d && (n = d.innerHTML || d.textContent || "")
                            }
                            n.length, n = f(n, !1);
                            let g = RegExp(`^${s.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}:?\\s*`);
                            n = n.replace(g, ""), c.lastIndex = 0;
                            let p = c.test(n),
                                u = n.replace(c, "").trim(),
                                h = E(s),
                                v = h;
                            if (t?.color && Array.isArray(t.color) && t.color.length >= 3) {
                                let [y, C, k] = t.color.map(e => Math.min(255, Math.max(0, parseInt(e) || 0)));
                                v = `<span class="reply-author-inline" style="color: rgb(${y}, ${C}, ${k})">${h}</span>`
                            } else v = `<span class="reply-author-inline">${h}</span>`;
                            if (!p || u) {
                                let $ = n;
                                p && u && ($ = u);
                                let b = !1;
                                for (let [N, V] of(($.endsWith("...") || $.includes("[") && !$.includes("]", $.lastIndexOf("["))) && (b = !0, $.includes("[spoile") && !$.includes("[spoiler]") && ($ = $.replace(/\[spoile\.?\.\.$/, "..."))), [
                                        [/\[spoiler\]([\s\S]*?)\[\/spoiler\]/gi, "$1"],
                                        [/\[spiler\]([\s\S]*?)\[\/spiler\]/gi, "$1"],
                                        [/\[b\]([\s\S]*?)\[\/b\]/gi, "$1"],
                                        [/\[i\]([\s\S]*?)\[\/i\]/gi, "$1"],
                                        [/\[u\]([\s\S]*?)\[\/u\]/gi, "$1"],
                                        [/\[s\]([\s\S]*?)\[\/s\]/gi, "$1"],
                                        [/\[code\]([\s\S]*?)\[\/code\]/gi, "$1"]
                                    ])) $.match(N), $ = $.replace(N, V);
                                for (let [I, M] of($.includes("<b>") || $.includes("<i>") || $.includes("<u>") || $.includes("<s>") || $.includes("<code>") || ($ = S($)), [
                                        [/\uE020([\s\S]*?)\uE021/g, '<span class="spoiler">$1</span>'],
                                        [/\uE022([\s\S]*?)\uE023/g, "<b>$1</b>"],
                                        [/\uE024([\s\S]*?)\uE025/g, "<i>$1</i>"],
                                        [/\uE026([\s\S]*?)\uE027/g, "<u>$1</u>"],
                                        [/\uE028([\s\S]*?)\uE029/g, "<s>$1</s>"],
                                        [/\uE02A([\s\S]*?)\uE02B/g, "<code>$1</code>"]
                                    ])) $ = $.replace(I, M);
                                $ = (t => {
                                    "string" != typeof t && (t = String(t || ""));
                                    let a = e.chat?.Settings?.Filter?.Emojis || [];
                                    if (a.length > 0) {
                                        let s = new Map;
                                        if (a.forEach((e, t) => {
                                                if (e && "string" == typeof e) {
                                                    let a = e;
                                                    e.startsWith("http") || e.startsWith("//") || (a = `../../emojis/${e}`), s.set(`:${t}:`, a)
                                                }
                                            }), s.size > 0) {
                                            let n = RegExp(Array.from(s.keys()).map(e => e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|"), "g");
                                            t = t.replace(n, e => `<img class="custom-emoji-msg reply-emoji" src="${s.get(e)}" alt="${e}" loading="lazy" onerror="this.style.display='none'" style="width: 16px; height: 16px; display: inline-block; vertical-align: text-bottom; margin: 0 1px;" />`)
                                        }
                                    }
                                    if (e.emojiData) {
                                        let o = document.createElement("div");
                                        o.innerHTML = t, l(o).forEach(e => {
                                            i(e, {
                                                forReply: !0
                                            })
                                        }), t = o.innerHTML
                                    }
                                    return t
                                })($);
                                let _ = "";
                                return p && (_ += ' <span class="reply-media-indicator"><i class="fa-solid fa-image"></i></span>'), b && (_ += ' <span class="reply-truncated-indicator" title="تم اقتطاع الرسالة">...</span>'), `${v}: <span class="reply-content-text">${$}</span>${_}`
                            }
                            return `${v}: <span class="reply-media-indicator"><i class="fa-solid fa-image"></i> Image, click to view</span>`
                        } catch (w) {
                            return '<span class="reply-error">Error loading reply</span>'
                        }
                    },
                    getAppleEmojiUrl: s,
                    getCustomEmojiUrl(t) {
                        try {
                            if (!t?.startsWith(":") || !t?.endsWith(":")) return null;
                            let a = parseInt(t.slice(1, -1));
                            if (isNaN(a)) return null;
                            let s = e.chat?.Settings?.Filter?.Emojis?.[a];
                            return s ? s.startsWith("http") || s.startsWith("//") ? s : `../../emojis/${s}` : null
                        } catch (n) {
                            return null
                        }
                    },
                    hasUserReacted(t) {
                        try {
                            let a = N.value[t];
                            if (!a) return !1;
                            let s = String(e.userId || "");
                            return !!Array.isArray(a) && a.some(e => "string" == typeof e ? e === s : e.id === s)
                        } catch (n) {
                            return !1
                        }
                    },
                    getReactionCount: e => e && Array.isArray(e) ? e.length : 0,
                    toggleReaction(t) {
                        try {
                            "function" == typeof e.onReact && e.message?.gId && e.onReact(e.message.gId, t)
                        } catch (a) {}
                    },
                    scrollToMessage(e) {
                        try {
                            if (!e) return;
                            n.add(() => {
                                let t = document.querySelector(`[data-msg-id="${CSS.escape(e)}"]`);
                                if (t) {
                                    let a = t;
                                    if (!t.classList.contains("message-item")) {
                                        let s = t.closest("li.message-item");
                                        s && (a = s)
                                    }
                                    a.scrollIntoView({
                                        behavior: "smooth",
                                        block: "center"
                                    }), a.classList.add("highlight-flash"), setTimeout(() => {
                                        a.classList.remove("highlight-flash")
                                    }, 2500)
                                }
                            })
                        } catch (t) {}
                    },
                    handleSpoilerClick(e) {
                        try {
                            let t = e.target;
                            t?.classList?.contains("spoiler") && (t.classList.toggle("revealed"), e.stopPropagation())
                        } catch (a) {}
                    },
                    getCurrentTime: () => x(e.message?.timestamp, "short"),
                    getFullTimestamp: () => x(e.message?.timestamp, "full"),
                    openImageModal(e) {
                        try {
                            e.preventDefault(), e.stopPropagation();
                            let t = e.target;
                            if (!t || !t.src) return;
                            r.imageModal.imageSrc = t.src, r.imageModal.imageAlt = t.alt || "Full size image", r.imageModal.isOpen = !0, r.imageModal.isClosing = !1, document.addEventListener("keydown", D)
                        } catch (a) {}
                    },
                    closeImageModal: P,
                    getImageClasses(e) {
                        if (!e || !e.naturalWidth || !e.naturalHeight) return "";
                        let t = [],
                            a = e.naturalWidth,
                            s = e.naturalHeight,
                            n = a / s,
                            o = Math.max(a, s);
                        return o < 200 ? t.push("small") : o < 400 ? t.push("medium") : t.push("large"), n > 1.5 ? t.push("landscape") : n < .8 ? t.push("portrait") : t.push("square"), t.join(" ")
                    },
                    handleImageError(t, a = null) {
                        try {
                            if (t) {
                                B.has("icon") || B.set("icon", 0);
                                let s = B.get("icon");
                                s < 3 ? (B.set("icon", s + 1), e.message.icon = "./images/user-avatar.png") : e.message.icon = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMjAiIGZpbGw9IiM1ODY1RjIiLz4KPC9zdmc+"
                            } else a && r.errors.images.set(a, "Failed to load")
                        } catch (n) {}
                    },
                    handleStickerError(e) {
                        try {
                            r.errors.stickers.set(e.index, "Failed to load")
                        } catch (t) {}
                    },
                    handleStickerLoad(e) {
                        try {
                            r.errors.stickers.delete(e.index)
                        } catch (t) {}
                    },
                    prevImage() {
                        try {
                            r.currentImageIndex > 0 && r.currentImageIndex--
                        } catch (e) {}
                    },
                    nextImage() {
                        try {
                            r.currentImageIndex < r.imageUrls.length - 1 && r.currentImageIndex++
                        } catch (e) {}
                    },
                    showTimestamp() {
                        try {
                            r.showFullTimestamp = !0
                        } catch (e) {}
                    },
                    hideTimestamp() {
                        try {
                            r.showFullTimestamp = !1
                        } catch (e) {}
                    },
                    async votePoll(t) {
                        let a = r.pollData || e.message?.pollData;
                        if (r.hasVoted || null !== r.selectedOption || !a?.active) return;
                        r.selectedOption = t, r.hasVoted = !0;
                        let s = "function" == typeof GetParentResourceName ? GetParentResourceName() : "Easy-Chat-Max";
                        try {
                            let n = await fetch(`https://${s}/votePoll`, {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json"
                                },
                                body: JSON.stringify({
                                    pollId: a.id,
                                    optionId: t
                                })
                            });
                            (await n.json()).success || (r.selectedOption = null, r.hasVoted = !1)
                        } catch (o) {
                            console.error("[votePoll] Error voting:", o), r.selectedOption = null, r.hasVoted = !1
                        }
                    },
                    getPollOptionPercentage(t) {
                        let a = r.pollData || e.message?.pollData;
                        if (!a || !a.totalVotes || 0 === a.totalVotes) return 0;
                        let s = t.votes || 0;
                        return Math.round(s / a.totalVotes * 100)
                    },
                    getPollTimeRemaining: Z,
                    isWinningOption(t) {
                        let a = r.pollData || e.message?.pollData;
                        if (!a || !a.options) return !1;
                        let s = Math.max(...a.options.map(e => e.votes || 0));
                        return (t.votes || 0) === s && t.votes > 0
                    },
                    pollHasVotes: J,
                    handleMessageClick(a) {
                        try {
                            if ("poll" === e.message?.type || "poll" === r.messageType) return;
                            let s = a.target;
                            if (s.classList.contains("message-image") || s.closest(".message-image-container") || s.closest(".message-sticker") || s.classList.contains("spoiler") || !s.closest(".message-text")) return;
                            let n = s.closest(".link");
                            if (n) {
                                a.preventDefault(), a.stopPropagation();
                                let o = n.textContent.trim();
                                return void t("showLinkModal", {
                                    url: o,
                                    callback() {
                                        window.invokeNative("openUrl", o)
                                    }
                                })
                            }
                            if (s.classList.contains("message-action-btn") || s.classList.contains("reaction-button") || s.classList.contains("reaction-pill") || s.closest(".reaction-pill") || s.closest(".message-reactions") || s.classList.contains("message-reply-preview") || s.classList.contains("poll-option-compact") || "IMG" === s.tagName || "VIDEO" === s.tagName || "A" === s.tagName) return;
                            a.stopPropagation();
                            let i = {
                                x: a.clientX,
                                y: a.clientY
                            };
                            t("showOptions", {
                                message: e.message,
                                position: i
                            })
                        } catch (l) {}
                    }
                }
            },
            render: function(e, t) {
                return _openBlock(), _createElementBlock("div", null, [_createElementVNode("li", {
                    class: _normalizeClass(["message-item", e.messageLayoutClass, {
                        "has-sticker": e.messageStickers.length > 0
                    }, {
                        "is-reply-to-me": e.message.isReplyToMe
                    }, {
                        "is-grouped": e.isGrouped
                    }, {
                        "is-hovered": e.isHovered
                    }, {
                        "is-own-message": e.isOwnMessage
                    }, {
                        "message-panel-open": e.isSelected
                    }, {
                        "pinned-message": e.message.isPinned && "poll" !== e.message.type
                    }, {
                        "avatars-hidden": e.hideAvatars
                    }, "animate__animated " + e.myAnimation]),
                    "data-msg-id": e.message.gId,
                    "data-has-gid": e.message.gId ? "true" : "false",
                    "data-animation": e.message.messageAnimation || e.message.animation || e.storage?.defaultMessageAnimation || "fadeIn",
                    "data-font": e.message.font || null,
                    "data-has-gradient": e.message.customColor && !e.message.cosmetics ? "true" : "false",
                    style: _normalizeStyle(e.getMessageGradientStyle()),
                    onMouseenter: e.handleMouseEnter,
                    onMouseleave: e.handleMouseLeave,
                    onClick: e.handleMessageClick,
                    role: "article",
                    "aria-label": "رسالة من " + (e.message.author || "غير معروف")
                }, [_createCommentVNode(" Layout Spacer (replaces Options Trigger) "), _createElementVNode("div", {
                    class: "message-layout-spacer",
                    "aria-hidden": "true"
                }, [_createCommentVNode(" Empty spacer to maintain grid layout ")]), _createCommentVNode(" Avatar Section "), e.isGrouped || "poll" === e.messageType ? _createCommentVNode("v-if", !0) : (_openBlock(), _createElementBlock("div", {
                    key: 0,
                    class: _normalizeClass(["message-avatar-wrapper", {
                        "avatar-hidden": e.hideAvatars
                    }])
                }, [_withDirectives(_createElementVNode("img", {
                    src: e.message.icon || "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxjaXJjbGUgY3g9IjIwIiBjeT0iMjAiIHI9IjIwIiBmaWxsPSIjNTg2NUYG2IvPgo8L3N2Zz4=",
                    onError: t => e.handleImageError(!0),
                    class: "message-avatar",
                    alt: (e.message.author || "User") + " avatar",
                    loading: "lazy"
                }, null, 40, ["src", "onError", "alt"]), [
                    [_vShow, !e.hideAvatars]
                ])], 2)), _createCommentVNode(" Grouped Gutter "), e.isGrouped && "poll" !== e.messageType ? (_openBlock(), _createElementBlock("div", {
                    key: 1,
                    class: _normalizeClass(["message-grouped-gutter", {
                        "avatar-hidden": e.hideAvatars
                    }]),
                    "aria-hidden": "true"
                }, [_createCommentVNode(" Keep empty for alignment ")], 2)) : _createCommentVNode("v-if", !0), _createCommentVNode(" Poll spacing for alignment "), "poll" !== e.messageType || e.isGrouped ? _createCommentVNode("v-if", !0) : (_openBlock(), _createElementBlock("div", {
                    key: 2,
                    style: _normalizeStyle(e.hideAvatars ? "width: 0;" : "width: 40px; flex-shrink: 0;")
                }, null, 4)), _createCommentVNode(" Message Content Container "), _createElementVNode("div", {
                    class: "message-content"
                }, [_createCommentVNode(" Reply Preview "), e.message.replyTo ? (_openBlock(), _createElementBlock("div", {
                    key: 0,
                    class: "message-reply-preview",
                    onClick: t => e.scrollToMessage(e.message.replyTo.gId),
                    role: "button",
                    tabindex: "0",
                    "aria-label": "الرد على رسالة من " + e.getAuthorName(e.message.replyTo)
                }, [_createElementVNode("i", {
                    class: "fa-solid fa-reply",
                    "aria-hidden": "true"
                }), _createElementVNode("div", {
                    class: "reply-content-wrapper"
                }, [_createElementVNode("span", {
                    class: "reply-text",
                    innerHTML: e.processReplyText(e.message.replyTo)
                }, null, 8, ["innerHTML"])])], 8, ["onClick", "aria-label"])) : _createCommentVNode("v-if", !0), _createCommentVNode(" Error State (skip for poll messages) "), e.errors.processing && "poll" !== e.messageType ? (_openBlock(), _createElementBlock("div", {
                    key: 1,
                    class: "message-error-state"
                }, [_createElementVNode("i", {
                    class: "fa-solid fa-exclamation-triangle"
                }), _createElementVNode("span", null, "Error loading message")])) : "poll" === e.messageType && e.message?.pollData ? (_openBlock(), _createElementBlock(_Fragment, {
                    key: 2
                }, [_createCommentVNode(" Message Layout Based on Type "), _createElementVNode("div", {
                    class: "message-body body-poll"
                }, [_createCommentVNode(" Poll Content "), _createElementVNode("div", {
                    class: "poll-message-container glass-morphism"
                }, [_createElementVNode("div", {
                    class: "poll-header-compact"
                }, [_createElementVNode("div", {
                    class: "poll-left-section"
                }, [_createElementVNode("img", {
                    src: e.message?.pollData?.creatorIcon || e.message?.icon || "./images/user-avatar.png",
                    class: "poll-creator-avatar-compact",
                    alt: "Poll creator avatar",
                    onError(e) {
                        e.target.src = "./images/user-avatar.png"
                    }
                }, null, 40, ["src", "onError"]), _createElementVNode("div", {
                    class: "poll-creator-info"
                }, [_createElementVNode("span", {
                    class: "poll-creator-name"
                }, _toDisplayString(e.message?.pollData?.creatorName || e.message?.author || "User"), 1), e.message?.pollData?.active ? (_openBlock(), _createElementBlock("span", {
                    key: 0,
                    class: "poll-timer-compact"
                }, [_createElementVNode("i", {
                    class: "fa-solid fa-clock"
                }), _createTextVNode(" " + _toDisplayString(e.getPollTimeRemaining), 1)])) : (_openBlock(), _createElementBlock("span", {
                    key: 1,
                    class: "poll-ended-compact"
                }, "انتهى"))])]), _createElementVNode("div", {
                    class: "poll-question-compact"
                }, _toDisplayString(e.message?.pollData?.question || e.pollData?.question || "استطلاع"), 1)]), _createElementVNode("div", {
                    class: "poll-options-compact"
                }, [(_openBlock(!0), _createElementBlock(_Fragment, null, _renderList(e.message?.pollData?.options || [], t => (_openBlock(), _createElementBlock("div", {
                    key: t.id,
                    class: _normalizeClass(["poll-option-compact", {
                        voted: e.selectedOption === t.id || e.hasVoted
                    }, {
                        selected: e.selectedOption === t.id
                    }, {
                        winning: e.isWinningOption(t)
                    }, {
                        disabled: e.hasVoted || !e.message?.pollData?.active
                    }]),
                    onClick: a => !e.hasVoted && e.message?.pollData?.active ? e.votePoll(t.id) : null
                }, [_createElementVNode("div", {
                    class: "poll-option-bar-compact"
                }, [_createElementVNode("div", {
                    class: "poll-option-fill-compact",
                    style: _normalizeStyle({
                        width: e.pollHasVotes ? (t.percentage || e.getPollOptionPercentage(t) || 0) + "%" : "0%"
                    })
                }, null, 4)]), _createElementVNode("div", {
                    class: "poll-option-content-compact"
                }, [_createElementVNode("span", {
                    class: "option-text-compact"
                }, _toDisplayString(t.text), 1), e.pollHasVotes ? (_openBlock(), _createElementBlock("div", {
                    key: 0,
                    class: "option-stats-compact"
                }, [_createElementVNode("span", {
                    class: "option-percentage-compact"
                }, _toDisplayString(t.percentage || e.getPollOptionPercentage(t) || 0) + "%", 1), _createElementVNode("span", {
                    class: "option-votes-compact"
                }, _toDisplayString(t.votes || 0), 1)])) : _createCommentVNode("v-if", !0)])], 10, ["onClick"]))), 128))]), e.pollHasVotes ? (_openBlock(), _createElementBlock("div", {
                    key: 0,
                    class: "poll-footer-compact"
                }, [_createElementVNode("span", {
                    class: "poll-total-compact"
                }, "صوت " + _toDisplayString(e.message?.pollData?.totalVotes || 0), 1)])) : _createCommentVNode("v-if", !0)])])], 2112)) : (_openBlock(), _createElementBlock(_Fragment, {
                    key: 3
                }, [_createCommentVNode(" Regular Message Layout "), _createElementVNode("div", {
                    class: _normalizeClass(["message-body", "body-" + e.messageType])
                }, [_createCommentVNode(" Text/Mixed Content "), "sticker-only" === e.messageType && e.isGrouped ? _createCommentVNode("v-if", !0) : (_openBlock(), _createElementBlock("div", {
                    key: 0,
                    class: "message-text-container"
                }, [_createCommentVNode(" Message content wrapper "), _createElementVNode("div", {
                    class: "message-content-wrapper"
                }, [_createElementVNode("p", {
                    style: _normalizeStyle(e.getMessageStyle()),
                    class: _normalizeClass(["message-text", "apple-glass", {
                        "mention-bg": e.containsMention && !e.hasMultilineContent
                    }, {
                        "grouped-message": e.isGrouped
                    }, {
                        "has-sticker-inline": "mixed" === e.messageType
                    }, {
                        "is-processing": e.isProcessing
                    }, {
                        "multiline-wrapper": e.hasMultilineContent
                    }, {
                        "reply-notification": e.message.isReplyToMe
                    }]),
                    "data-msg-id": e.message.gId,
                    onClick: e.handleSpoilerClick,
                    role: "region",
                    "aria-label": e.containsMention || e.message.isReplyToMe ? "الرسالة تذكرك" : null
                }, [_withDirectives(_createElementVNode("span", {
                    "aria-hidden": "true"
                }, null, 512), [
                    [_vShow, !e.isGrouped]
                ]), _createElementVNode("span", {
                    innerHTML: e.textEscaped
                }, null, 8, ["innerHTML"]), e.message.edited || e.message.isEdited ? (_openBlock(), _createElementBlock("span", {
                    key: 0,
                    class: "message-edited-indicator"
                }, "(edited)")) : _createCommentVNode("v-if", !0)], 14, ["data-msg-id", "onClick", "aria-label"]), _createCommentVNode(" Time display without action buttons "), _createElementVNode("div", {
                    class: "message-actions-wrapper"
                }, [_createElementVNode("span", {
                    class: "message-time"
                }, [e.isGrouped ? (_openBlock(), _createElementBlock("span", {
                    key: 0,
                    class: "message-time-text",
                    onMouseenter: e.showTimestamp,
                    onMouseleave: e.hideTimestamp,
                    "aria-label": e.getFullTimestamp()
                }, _toDisplayString(e.getCurrentTime()), 41, ["onMouseenter", "onMouseleave", "aria-label"])) : (_openBlock(), _createElementBlock("span", {
                    key: 1,
                    class: "message-time-text",
                    "aria-label": e.getFullTimestamp()
                }, _toDisplayString(e.getCurrentTime()), 9, ["aria-label"])), e.isGrouped && e.showFullTimestamp ? (_openBlock(), _createElementBlock("div", {
                    key: 2,
                    class: "message-time-tooltip",
                    role: "tooltip"
                }, _toDisplayString(e.getFullTimestamp()), 1)) : _createCommentVNode("v-if", !0)])])])])), _createCommentVNode(" Stickers Container "), e.messageStickers.length > 0 ? (_openBlock(), _createElementBlock("div", {
                    key: 1,
                    class: _normalizeClass(["message-stickers-wrapper", "stickers-" + e.messageType])
                }, [_createCommentVNode(" Sticker content wrapper for sticker-only messages "), "sticker-only" === e.messageType && e.isGrouped ? (_openBlock(), _createElementBlock("div", {
                    key: 0,
                    class: "sticker-content-wrapper"
                }, [_createCommentVNode(" Stickers "), _createElementVNode("div", {
                    style: {
                        display: "flex",
                        gap: "8px",
                        "flex-wrap": "wrap"
                    }
                }, [(_openBlock(!0), _createElementBlock(_Fragment, null, _renderList(e.messageStickers, (t, a) => (_openBlock(), _createElementBlock("div", {
                    key: t.index,
                    class: _normalizeClass(["message-sticker-container", "enhanced", {
                        "sticker-inline": "mixed" === e.messageType
                    }, {
                        "sticker-standalone": "sticker-only" === e.messageType
                    }, {
                        "sticker-multiple": e.messageStickers.length > 1
                    }, {
                        "has-error": e.errors.stickers.has(t.index)
                    }])
                }, [e.errors.stickers.has(t.index) ? (_openBlock(), _createElementBlock("div", {
                    key: 1,
                    class: "sticker-error"
                }, [_createElementVNode("i", {
                    class: "fa-solid fa-image-slash"
                })])) : (_openBlock(), _createElementBlock("img", {
                    key: 0,
                    src: t.url,
                    alt: "Sticker " + t.index,
                    class: _normalizeClass(["message-sticker", "sticker-" + e.messageType]),
                    loading: "lazy",
                    onLoad: a => e.handleStickerLoad(t),
                    onError: a => e.handleStickerError(t)
                }, null, 42, ["src", "alt", "onLoad", "onError"]))], 2))), 128))]), _createCommentVNode(" Time display without action buttons "), _createElementVNode("div", {
                    class: "message-actions-wrapper"
                }, [_createElementVNode("span", {
                    class: "message-time"
                }, [_createElementVNode("span", {
                    class: "message-time-text",
                    onMouseenter: e.showTimestamp,
                    onMouseleave: e.hideTimestamp,
                    "aria-label": e.getFullTimestamp()
                }, _toDisplayString(e.getCurrentTime()), 41, ["onMouseenter", "onMouseleave", "aria-label"]), e.showFullTimestamp ? (_openBlock(), _createElementBlock("div", {
                    key: 0,
                    class: "message-time-tooltip",
                    role: "tooltip"
                }, _toDisplayString(e.getFullTimestamp()), 1)) : _createCommentVNode("v-if", !0)])])])) : (_openBlock(), _createElementBlock(_Fragment, {
                    key: 1
                }, [_createCommentVNode(" Regular stickers (not sticker-only grouped) "), (_openBlock(!0), _createElementBlock(_Fragment, null, _renderList(e.messageStickers, (t, a) => (_openBlock(), _createElementBlock("div", {
                    key: t.index,
                    class: _normalizeClass(["message-sticker-container", "enhanced", {
                        "sticker-inline": "mixed" === e.messageType
                    }, {
                        "sticker-standalone": "sticker-only" === e.messageType
                    }, {
                        "sticker-multiple": e.messageStickers.length > 1
                    }, {
                        "has-error": e.errors.stickers.has(t.index)
                    }])
                }, [e.errors.stickers.has(t.index) ? (_openBlock(), _createElementBlock("div", {
                    key: 1,
                    class: "sticker-error"
                }, [_createElementVNode("i", {
                    class: "fa-solid fa-image-slash"
                })])) : (_openBlock(), _createElementBlock("img", {
                    key: 0,
                    src: t.url,
                    alt: "Sticker " + t.index,
                    class: _normalizeClass(["message-sticker", "sticker-" + e.messageType]),
                    loading: "lazy",
                    onLoad: a => e.handleStickerLoad(t),
                    onError: a => e.handleStickerError(t)
                }, null, 42, ["src", "alt", "onLoad", "onError"]))], 2))), 128))], 64))], 2)) : _createCommentVNode("v-if", !0)], 2)], 2112)), _createCommentVNode(" Images Container "), e.imageUrls.length && !e.errors.processing ? (_openBlock(), _createElementBlock("div", {
                    key: 4,
                    class: _normalizeClass(["message-image-container", {
                        "has-multiple-images": e.imageUrls.length > 1
                    }])
                }, [e.imageUrls.length > 1 ? (_openBlock(), _createElementBlock("button", {
                    key: 0,
                    onClick: e.prevImage,
                    class: "image-nav-button prev",
                    disabled: 0 === e.currentImageIndex,
                    "aria-label": "Previous image (" + (e.currentImageIndex + 1) + " of " + e.imageUrls.length + ")"
                }, [_createElementVNode("i", {
                    class: "fa-solid fa-chevron-left",
                    "aria-hidden": "true"
                })], 8, ["onClick", "disabled", "aria-label"])) : _createCommentVNode("v-if", !0), e.errors.images.has(e.imageUrls[e.currentImageIndex]) ? (_openBlock(), _createElementBlock("div", {
                    key: 2,
                    class: "image-error"
                }, [_createElementVNode("i", {
                    class: "fa-solid fa-image-slash"
                }), _createElementVNode("span", null, "Failed to load image")])) : (_openBlock(), _createElementBlock("img", {
                    key: 1,
                    src: e.imageUrls[e.currentImageIndex],
                    crossorigin: "anonymous",
                    referrerpolicy: "no-referrer",
                    onError: t => e.handleImageError(!1, e.imageUrls[e.currentImageIndex]),
                    onClick: e.openImageModal,
                    onLoad(t) {
                        let a = e.getImageClasses(t.target);
                        a && a.split(" ").forEach(e => t.target.classList.add(e)), t.target.classList.add("is-loaded")
                    },
                    "data-img-id": e.message.gId,
                    class: "message-image",
                    alt: "Image " + (e.currentImageIndex + 1) + " of " + e.imageUrls.length,
                    "aria-label": "Image " + (e.currentImageIndex + 1) + " of " + e.imageUrls.length + " - Click to view full size"
                }, null, 40, ["src", "onError", "onClick", "onLoad", "data-img-id", "alt", "aria-label"])), e.imageUrls.length > 1 ? (_openBlock(), _createElementBlock("button", {
                    key: 3,
                    onClick: e.nextImage,
                    class: "image-nav-button next",
                    disabled: e.currentImageIndex === e.imageUrls.length - 1,
                    "aria-label": "Next image (" + (e.currentImageIndex + 1) + " of " + e.imageUrls.length + ")"
                }, [_createElementVNode("i", {
                    class: "fa-solid fa-chevron-right",
                    "aria-hidden": "true"
                })], 8, ["onClick", "disabled", "aria-label"])) : _createCommentVNode("v-if", !0), e.imageUrls.length > 1 ? (_openBlock(), _createElementBlock("div", {
                    key: 4,
                    class: "image-counter"
                }, _toDisplayString(e.currentImageIndex + 1) + " / " + _toDisplayString(e.imageUrls.length), 1)) : _createCommentVNode("v-if", !0)], 2)) : _createCommentVNode("v-if", !0), _createCommentVNode(" Reactions "), e.hasReactions ? (_openBlock(), _createElementBlock("div", {
                    key: 5,
                    class: "message-reactions",
                    role: "group",
                    "aria-label": "Message reactions"
                }, [(_openBlock(!0), _createElementBlock(_Fragment, null, _renderList(e.messageReactions, (t, a) => (_openBlock(), _createElementBlock("span", {
                    key: a,
                    onClick: _withModifiers(t => e.toggleReaction(a), ["stop"]),
                    class: _normalizeClass(["reaction-pill", {
                        "user-reacted": e.hasUserReacted(a)
                    }]),
                    title: "Click to toggle reaction",
                    role: "button",
                    tabindex: "0",
                    "aria-label": a + " reaction by " + e.getReactionCount(t) + " user" + (1 !== e.getReactionCount(t) ? "s" : "") + (e.hasUserReacted(a) ? " including you" : ""),
                    "aria-pressed": e.hasUserReacted(a)
                }, [a.startsWith(":") && a.endsWith(":") ? (_openBlock(), _createElementBlock("span", {
                    key: 0
                }, [_createElementVNode("img", {
                    src: e.getCustomEmojiUrl(a),
                    class: "reaction-emoji-img",
                    alt: "",
                    loading: "lazy",
                    onError: e => e.target.style.display = "none"
                }, null, 40, ["src", "onError"])])) : e.getAppleEmojiUrl(a) ? (_openBlock(), _createElementBlock("span", {
                    key: 1
                }, [_createElementVNode("img", {
                    src: e.getAppleEmojiUrl(a),
                    class: "reaction-emoji-img",
                    alt: a,
                    loading: "lazy",
                    onError: e => e.target.style.display = "none"
                }, null, 40, ["src", "alt", "onError"])])) : (_openBlock(), _createElementBlock("span", {
                    key: 2
                }, _toDisplayString(a), 1)), _createElementVNode("span", {
                    class: "reaction-count",
                    "aria-label": "reaction count"
                }, _toDisplayString(e.getReactionCount(t)), 1)], 10, ["onClick", "aria-label", "aria-pressed"]))), 128))])) : _createCommentVNode("v-if", !0)])], 46, ["data-msg-id", "data-has-gid", "data-animation", "data-font", "data-has-gradient", "onMouseenter", "onMouseleave", "onClick", "aria-label"]), _createCommentVNode(" Image Modal (Vue-style) "), e.imageModal.isOpen ? (_openBlock(), _createBlock(_Teleport, {
                    key: 0,
                    to: "body"
                }, [_createElementVNode("div", {
                    class: _normalizeClass(["image-modal-overlay", {
                        "modal-closing": e.imageModal.isClosing
                    }]),
                    onClick: e.closeImageModal,
                    role: "dialog",
                    "aria-modal": "true",
                    "aria-label": "Full size image: " + e.imageModal.imageAlt
                }, [_createElementVNode("img", {
                    src: e.imageModal.imageSrc,
                    alt: e.imageModal.imageAlt,
                    class: "image-modal-content",
                    crossorigin: "anonymous",
                    referrerpolicy: "no-referrer"
                }, null, 8, ["src", "alt"]), _createElementVNode("div", {
                    class: "image-modal-close",
                    onClick: e.closeImageModal,
                    role: "button",
                    "aria-label": "Close image modal",
                    tabindex: "0",
                    onKeydown: [_withKeys(e.closeImageModal, ["enter"]), _withKeys(_withModifiers(e.closeImageModal, ["prevent"]), ["space"])]
                }, [_createElementVNode("i", {
                    class: "fas fa-times",
                    "aria-hidden": "true"
                })], 40, ["onClick", "onKeydown"]), _createElementVNode("div", {
                    class: "image-modal-hint",
                    "aria-live": "polite"
                }, " اضغط ESC او اي مكان لاغلاق الصورة ")], 10, ["onClick", "aria-label"])])) : _createCommentVNode("v-if", !0)])
            }
        }),
        a = defineComponent({
            props: ["messages", "onClose"],
            emits: ["close"],
            setup(e, {
                emit: t
            }) {
                let a = reactive({
                        query: "",
                        currentIndex: -1,
                        matchCount: 0,
                        textDirection: "ltr",
                        isClosing: !1
                    }),
                    s = ref(null),
                    n = () => {
                        document.querySelectorAll(".search-highlight-text").forEach(e => {
                            let t = e.parentNode;
                            t.replaceChild(document.createTextNode(e.textContent), e), t.normalize()
                        }), document.querySelectorAll(".search-match").forEach(e => {
                            e.classList.remove("search-match")
                        })
                    },
                    o = () => {
                        a.isClosing = !0, n(), a.query = "", a.matchCount = 0, a.currentIndex = -1, e.onClose ? e.onClose() : t("close")
                    };
                return onMounted(() => {
                    s.value?.focus()
                }), onUnmounted(() => {
                    n()
                }), {
                    ...toRefs(a),
                    searchInputRef: s,
                    handleSearchInput(e) {
                        var t;
                        a.query = e.target.value, a.currentIndex = -1, a.textDirection = (t = a.query, /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/.test(t) ? "rtl" : "ltr"), (() => {
                            if (n(), !a.query) return void(a.matchCount = 0);
                            let e = a.query.toLowerCase(),
                                t = null,
                                s = (e, t) => {
                                    let a = e.textContent,
                                        n = a.toLowerCase().indexOf(t);
                                    if (-1 !== n) {
                                        let o = a.substring(0, n),
                                            i = a.substring(n, n + t.length),
                                            l = a.substring(n + t.length),
                                            r = e.parentNode,
                                            c = document.createDocumentFragment();
                                        o && c.appendChild(document.createTextNode(o));
                                        let d = document.createElement("span");
                                        if (d.className = "search-highlight-text", d.textContent = i, c.appendChild(d), l) {
                                            let m = document.createTextNode(l);
                                            c.appendChild(m), r.replaceChild(c, e), s(m, t)
                                        } else r.replaceChild(c, e);
                                        return !0
                                    }
                                    return !1
                                },
                                o = t => {
                                    let a = !1;
                                    if (t.classList?.contains("search-highlight-text") || t.classList?.contains("message-time") || t.classList?.contains("message-actions") || t.classList?.contains("reaction-pill")) return !1;
                                    let n = Array.from(t.childNodes);
                                    for (let i of n) i.nodeType === Node.TEXT_NODE ? s(i, e) && (a = !0) : i.nodeType === Node.ELEMENT_NODE && o(i) && (a = !0);
                                    return a
                                };
                            document.querySelectorAll(".message-item").forEach(e => {
                                o(e) && (e.classList.add("search-match"), t || (t = e))
                            }), a.matchCount = document.querySelectorAll(".search-highlight-text").length, t && nextTick(() => {
                                t.scrollIntoView({
                                    behavior: "smooth",
                                    block: "center"
                                })
                            })
                        })()
                    },
                    handleKeydown(e) {
                        if ("Escape" === e.key) o();
                        else if ("Backspace" === e.key && "" === a.query) o();
                        else if ("Enter" === e.key) {
                            e.preventDefault();
                            let t = document.querySelectorAll(".search-highlight-text");
                            if (t.length > 0) {
                                a.currentIndex = (a.currentIndex + 1) % t.length;
                                let s = t[a.currentIndex];
                                s.scrollIntoView({
                                    behavior: "smooth",
                                    block: "center"
                                }), s.classList.add("search-focus"), setTimeout(() => {
                                    s.classList.remove("search-focus")
                                }, 1e3)
                            }
                        }
                    },
                    handleBlur(e) {
                        let t = e.currentTarget.closest(".search-bar-minimal");
                        e.relatedTarget, setTimeout(() => {
                            t?.contains(document.activeElement) || a.isClosing || o()
                        }, 100)
                    },
                    closeSearch: o
                }
            },
            render: function(e, t) {
                return _openBlock(), _createElementBlock("div", {
                    class: "search-bar-minimal",
                    onClick: _withModifiers(() => {}, ["stop"])
                }, [_createElementVNode("i", {
                    class: "fa-solid fa-search search-icon-minimal"
                }), _createElementVNode("input", {
                    ref: "searchInputRef",
                    value: e.query,
                    onInput: e.handleSearchInput,
                    onKeydown: e.handleKeydown,
                    onBlur: e.handleBlur,
                    type: "text",
                    class: "search-input-minimal",
                    style: _normalizeStyle({
                        direction: e.textDirection,
                        textAlign: "rtl" === e.textDirection ? "right" : "left"
                    }),
                    placeholder: "البحث...",
                    autocomplete: "off"
                }, null, 44, ["value", "onInput", "onKeydown", "onBlur"]), e.matchCount > 0 ? (_openBlock(), _createElementBlock("span", {
                    key: 0,
                    class: "search-count"
                }, _toDisplayString(e.matchCount), 1)) : _createCommentVNode("v-if", !0), _createElementVNode("button", {
                    onClick: e.closeSearch,
                    class: "search-close-minimal"
                }, [_createElementVNode("i", {
                    class: "fa-solid fa-times"
                })], 8, ["onClick"])], 8, ["onClick"])
            }
        }),
        s = defineComponent({
            props: ["typingUsers", "showInput"],
            render: function(e, t) {
                return _openBlock(), _createBlock(_Transition, {
                    name: "typing-slide"
                }, {
                    default: _withCtx(() => [e.showInput && e.displayText ? (_openBlock(), _createElementBlock("div", {
                        key: 0,
                        class: "typing-indicator"
                    }, [_createElementVNode("div", {
                        class: "typing-dots"
                    }, [_createElementVNode("span"), _createElementVNode("span"), _createElementVNode("span")]), _createElementVNode("span", {
                        class: "typing-text"
                    }, _toDisplayString(e.displayText), 1)])) : _createCommentVNode("v-if", !0)]),
                    _: 1
                })
            },
            computed: {
                displayText() {
                    let e = this.typingUsers;
                    return e.length ? 1 === e.length ? `${e[0]} is typing...` : 2 === e.length ? `${e[0]} and ${e[1]} are typing...` : e.length <= 5 ? `${e[0]} and ${e.length-1} others are typing...` : "Many people are typing..." : ""
                }
            }
        }),
        n = {
            queues: {
                high: [],
                normal: [],
                low: []
            },
            rafId: null,
            add(e, t = "normal") {
                "function" == typeof e && (this.queues[t].push(e), this.rafId || (this.rafId = requestAnimationFrame(() => {
                    this.flush()
                })))
            },
            flush() {
                let e = [...this.queues.high.splice(0), ...this.queues.normal.splice(0), ...this.queues.low.splice(0)];
                for (let t = 0; t < e.length; t++) try {
                    e[t]()
                } catch (a) {
                    console.error("RAF Scheduler error:", a)
                }
                this.rafId = null, (this.queues.high.length > 0 || this.queues.normal.length > 0 || this.queues.low.length > 0) && (this.rafId = requestAnimationFrame(() => {
                    this.flush()
                }))
            },
            clear() {
                this.rafId && (cancelAnimationFrame(this.rafId), this.rafId = null), this.queues.high = [], this.queues.normal = [], this.queues.low = []
            }
        },
        o = {
            users: new Map,
            timerId: null,
            updateCallback: null,
            checkInterval: 500,
            init(e) {
                this.updateCallback = e, this.startTimer()
            },
            startTimer() {
                this.timerId || (this.timerId = setInterval(() => {
                    this.checkExpired()
                }, this.checkInterval))
            },
            stopTimer() {
                this.timerId && (clearInterval(this.timerId), this.timerId = null)
            },
            addUser(e) {
                let t = 0 === this.users.size,
                    a = this.users.has(e);
                this.users.set(e, Date.now() + 5e3), !a && this.updateCallback && this.updateCallback(this.getUserList()), t && this.startTimer()
            },
            removeUser(e) {
                this.users.delete(e) && this.updateCallback && this.updateCallback(this.getUserList()), 0 === this.users.size && this.stopTimer()
            },
            checkExpired() {
                let e = Date.now(),
                    t = !1;
                for (let [a, s] of this.users) e >= s && (this.users.delete(a), t = !0);
                t && this.updateCallback && this.updateCallback(this.getUserList()), 0 === this.users.size && this.stopTimer()
            },
            getUserList() {
                return Array.from(this.users.keys())
            },
            clear() {
                this.users.clear(), this.stopTimer(), this.updateCallback && this.updateCallback([])
            },
            destroy() {
                this.clear(), this.updateCallback = null
            }
        },
        i = {
            config: {
                nearBottomThreshold: 150
            },
            state: {
                container: null,
                userHasScrolled: !1,
                scrollQueued: !1,
                newMessagesWhileScrolled: 0,
                onNewMessageCallback: null
            },
            init(e, t) {
                e && (this.state.container = e, this.state.onNewMessageCallback = t, e.addEventListener("scroll", this.handleUserScroll.bind(this), {
                    passive: !0
                }), this.setupMutationObserver(e), this.setupResizeObserver(e))
            },
            destroy() {
                this.state.container && this.state.container.removeEventListener("scroll", this.handleUserScroll), this.state.imageLoadTimer && clearTimeout(this.state.imageLoadTimer), this.observer && this.observer.disconnect(), this.resizeObserver && this.resizeObserver.disconnect(), this.state.container = null
            },
            handleUserScroll() {
                let e = this.state.container;
                if (!e) return;
                let t = e.scrollHeight,
                    a = e.scrollTop,
                    s = t - e.clientHeight - a,
                    n = this.state.userHasScrolled;
                this.state.userHasScrolled = s > this.config.nearBottomThreshold, n && !this.state.userHasScrolled && (this.state.newMessagesWhileScrolled = 0, this.state.onNewMessageCallback && this.state.onNewMessageCallback(0))
            },
            isNearBottom() {
                let e = this.state.container;
                if (!e) return !1;
                let t = e.scrollHeight,
                    a = e.scrollTop;
                return t - e.clientHeight - a <= this.config.nearBottomThreshold
            },
            scrollToBottom(e = !1) {
                if (!e && this.state.userHasScrolled || !this.state.container) return;
                let t = () => {
                    this.state.container && (this.state.container.scrollTop = this.state.container.scrollHeight, this.state.userHasScrolled = !1)
                };
                t(), e && n.add(t, "high")
            },
            setupResizeObserver(e) {
                this.resizeObserver && this.resizeObserver.disconnect(), this.resizeObserver = new ResizeObserver(() => {
                    this.state.userHasScrolled || this.scrollToBottom(!0)
                });
                let t = e.querySelector(".messages-list");
                t && this.resizeObserver.observe(t)
            },
            setupMutationObserver(e) {
                this.observer && this.observer.disconnect(), this.observer = new MutationObserver(e => {
                    let t = !1,
                        a = [];
                    e.forEach(e => {
                        e.addedNodes.forEach(e => {
                            if (1 === e.nodeType) {
                                if (e.classList?.contains("message-item") || e.querySelector?.(".message-item")) {
                                    t = !0;
                                    let s = e.querySelectorAll("img");
                                    a.push(...s)
                                }
                                "IMG" === e.tagName && (a.push(e), t = !0)
                            }
                        })
                    }), t && (this.isNearBottom() && !this.state.userHasScrolled ? this.state.scrollQueued || (this.state.scrollQueued = !0, n.add(() => {
                        if (this.state.scrollQueued = !1, this.scrollToBottom(), a.length > 0) {
                            let e = 0,
                                t = a.length;
                            a.forEach(a => {
                                a.complete ? e++ : (a.addEventListener("load", () => {
                                    ++e === t && this.scrollToBottom(!0)
                                }, {
                                    once: !0
                                }), a.addEventListener("error", () => {
                                    ++e === t && this.scrollToBottom(!0)
                                }, {
                                    once: !0
                                }))
                            }), e === t && setTimeout(() => this.scrollToBottom(!0), 50), setTimeout(() => this.scrollToBottom(!0), 600)
                        }
                    }, "high")) : (this.state.newMessagesWhileScrolled++, this.state.onNewMessageCallback && this.state.onNewMessageCallback(this.state.newMessagesWhileScrolled)))
                }), this.observer.observe(e, {
                    childList: !0,
                    subtree: !0
                })
            },
            forceScrollToBottom() {
                this.state.newMessagesWhileScrolled = 0, this.state.onNewMessageCallback && this.state.onNewMessageCallback(0), this.scrollToBottom({
                    force: !0
                })
            },
            softScrollToBottom() {
                this.scrollToBottom({
                    force: !1
                })
            },
            setNewMessageCallback(e) {
                this.state.onNewMessageCallback = e
            },
            getNewMessageCount() {
                return this.state.newMessagesWhileScrolled
            },
            resetNewMessageCount() {
                this.state.newMessagesWhileScrolled = 0, this.state.onNewMessageCallback && this.state.onNewMessageCallback(0)
            },
            handleImageMessage() {
                this.state.userHasScrolled = !1, this.scrollToBottom(!0), setTimeout(() => {
                    this.state.container && (this.state.container.scrollTop = this.state.container.scrollHeight)
                }, 400)
            }
        },
        l = {
            limits: new Map,
            canRequest(e, t = 1e3) {
                let a = Date.now(),
                    s = this.limits.get(e);
                return (!s || a - s >= t) && (this.limits.set(e, a), !0)
            },
            getCooldown(e, t = 1e3) {
                let a = Date.now(),
                    s = this.limits.get(e);
                return s ? Math.max(0, t - (a - s)) : 0
            },
            throttle(e, t, a = 1e3) {
                return (...s) => this.canRequest(t, a) ? e(...s) : null
            },
            clear(e) {
                this.limits.delete(e)
            },
            clearAll() {
                this.limits.clear()
            }
        },
        r = {
            data: null,
            loaded: !1,
            loading: !1,
            callbacks: [],
            nativeToUnified: new Map,
            nameToEmoji: new Map,
            categoryIndex: new Map,
            urlCache: new Map,
            async load() {
                if (this.loaded) return this.data;
                if (this.loading) return new Promise(e => this.callbacks.push(e));
                this.loading = !0;
                try {
                    let e = await fetch("https://cdn.jsdelivr.net/npm/@emoji-mart/data");
                    e.ok && (this.data = await e.json(), this.preprocessData(), this.loaded = !0, this.callbacks.forEach(e => e(this.data)), this.callbacks = [])
                } catch (t) {}
                return this.loading = !1, this.data
            },
            preprocessData() {
                if (this.data && this.data.emojis) {
                    for (let [e, t] of(this.nativeToUnified.clear(), this.nameToEmoji.clear(), this.categoryIndex.clear(), Object.entries(this.data.emojis)))
                        if (t.skins?.[0]) {
                            let a = t.skins[0];
                            a.native && this.nativeToUnified.set(a.native, a.unified), t.name && this.nameToEmoji.set(t.name.toLowerCase(), t), t._id = e
                        } if (this.data.categories)
                        for (let s of this.data.categories) s.id && s.emojis && this.categoryIndex.set(s.id, s.emojis)
                }
            },
            getAppleEmojiUrl(e) {
                if (!e) return null;
                if (this.urlCache.has(e)) return this.urlCache.get(e);
                let t = this.nativeToUnified.get(e);
                if (t) {
                    let a = `https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/${t.toLowerCase()}.png`;
                    return this.urlCache.set(e, a), a
                }
                return null
            }
        };
    class c extends EventTarget {
        emit(e, t) {
            this.dispatchEvent(new CustomEvent(e, {
                detail: t
            }))
        }
        on(e, t) {
            return this.addEventListener(e, t), () => this.removeEventListener(e, t)
        }
    }
    let d = new c,
        m = {
            isEmpty: e => null == e || "" === e || /^\s*$/.test(e),
            isNumeric: e => "string" == typeof e && !isNaN(e) && !isNaN(parseFloat(e)),
            playSound: (() => {
                let e = new Map;
                return (t, a = !1) => {
                    try {
                        if (!t.startsWith("http://") && !t.startsWith("https://") && !t.startsWith("file://")) {
                            let s = window.location.href.substring(0, window.location.href.lastIndexOf("/") + 1);
                            t = new URL(t, s).href
                        }
                        if (!e.has(t)) {
                            if (e.size >= 10) {
                                let n = e.keys().next().value;
                                e.delete(n)
                            }
                            let o = new Audio(t);
                            o.load(), e.set(t, o)
                        }
                        let i = e.get(t);
                        i.volume = .6, i.loop = a, i.currentTime = 0;
                        let l = i.play();
                        void 0 !== l && l.catch(e => {
                            console.error("Audio playback failed:", e), console.error("Attempted URL:", t)
                        })
                    } catch (r) {
                        console.error("Audio playback error:", r), console.error("Failed URL:", t)
                    }
                }
            })(),
            debounce(e, t) {
                let a;
                return (...s) => {
                    clearTimeout(a), a = setTimeout(() => e(...s), t)
                }
            },
            throttle: (e, t) => {
                let a;
                return (...s) => {
                    a || (e.apply(this, s), a = !0, setTimeout(() => a = !1, t))
                }
            }
        };
    window.utils = m, window.sharedEmojiData = r;
    let g = createApp({
        components: {
            MessageComponent: t,
            TipTapInput: {
                name: "TipTapInput",
                props: ["modelValue", "placeholder", "disabled", "messageFont", "emojis", "lastFiveMessages", "currentChannel", "emojiData", "discordAssets", "permissions"],
                emits: ["update:modelValue", "enter", "typing", "imageUpload", "imageUploaded"],
                setup(e, {
                    emit: t
                }) {
                    let {
                        ref: a,
                        reactive: s,
                        computed: o,
                        watch: i,
                        onMounted: l,
                        onBeforeUnmount: r,
                        nextTick: c,
                        shallowRef: d,
                        watchEffect: m
                    } = Vue, g = d(null), p = a(null), u = [], h = !1, f = null, v = "", y = s({
                        showMentionSuggestions: !1,
                        mentionSuggestions: [],
                        selectedMentionIndex: 0,
                        mentionQuery: "",
                        textDirection: "ltr",
                        lastTypingEmit: 0,
                        isInitialized: !1,
                        editorReady: !1,
                        isDestroyed: !1,
                        showBubbleMenu: !1,
                        activeFormats: {
                            bold: !1,
                            italic: !1,
                            underline: !1,
                            strike: !1,
                            code: !1,
                            spoiler: !1
                        },
                        stickers: [],
                        displayText: "",
                        actualText: "",
                        isUploadingImage: !1,
                        uploadedImages: [],
                        imageHashes: new Set,
                        messageHistory: [],
                        historyPosition: -1,
                        currentDraft: {
                            text: "",
                            html: "",
                            json: null
                        }
                    }), C = () => {
                        if (0 === y.messageHistory.length) return;
                        if (-1 === y.historyPosition) y.currentDraft = {
                            text: T(),
                            html: S(),
                            json: g.value ? g.value.getJSON() : null
                        }, y.historyPosition = 0;
                        else {
                            if (!(y.historyPosition < y.messageHistory.length - 1)) return;
                            y.historyPosition++
                        }
                        let e = y.messageHistory[y.messageHistory.length - 1 - y.historyPosition];
                        if (g.value && !g.value.isDestroyed) {
                            if ("object" == typeof e && e.json) g.value.chain().setContent(e.json).focus("start").run();
                            else if ("object" == typeof e && e.html) g.value.chain().setContent(e.html).focus("start").run();
                            else {
                                let t = "string" == typeof e ? e : e.text;
                                g.value.chain().setContent(t).focus("start").run()
                            }
                        }
                    }, k = () => {
                        if (y.historyPosition <= 0) {
                            if (0 === y.historyPosition && (y.historyPosition = -1, g.value && !g.value.isDestroyed)) {
                                if ("object" == typeof y.currentDraft && y.currentDraft.json) g.value.chain().setContent(y.currentDraft.json).focus("end").run();
                                else if ("object" == typeof y.currentDraft && y.currentDraft.html) g.value.chain().setContent(y.currentDraft.html).focus("end").run();
                                else {
                                    let e = "string" == typeof y.currentDraft ? y.currentDraft : y.currentDraft.text || "";
                                    g.value.chain().setContent(e).focus("end").run()
                                }
                            }
                            return
                        }
                        y.historyPosition--;
                        let t = 0 === y.historyPosition ? y.messageHistory[y.messageHistory.length - 1] : y.messageHistory[y.messageHistory.length - 1 - y.historyPosition];
                        if (g.value && !g.value.isDestroyed) {
                            if ("object" == typeof t && t.json) g.value.chain().setContent(t.json).focus("end").run();
                            else if ("object" == typeof t && t.html) g.value.chain().setContent(t.html).focus("end").run();
                            else {
                                let a = "string" == typeof t ? t : t.text;
                                g.value.chain().setContent(a).focus("end").run()
                            }
                        }
                    }, E = e => window.sharedEmojiData?.getAppleEmojiUrl(e);
                    m(() => {
                        e.lastFiveMessages && window.MentionService && window.MentionService.updateKnownUsers(e.lastFiveMessages)
                    });
                    let $ = () => e.messageFont && "default" !== e.messageFont ? ({
                            cairo: "Cairo",
                            amiri: "Amiri",
                            almarai: "Almarai",
                            tajawal: "Tajawal",
                            harmattan: "Harmattan",
                            lateef: "Lateef",
                            scheherazade: "Scheherazade New",
                            noto: "Noto Naskh Arabic",
                            aref: "Aref Ruqaa",
                            reem: "Reem Kufi"
                        })[e.messageFont] || "Tajawal" : "Tajawal, sans-serif",
                        b = e => {
                            let t = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/,
                                a = /[A-Za-z]/,
                                s = e.replace(/<[^>]*>/g, "").replace(/:[^:]+:/g, "").trim(),
                                n = 0,
                                o = 0;
                            for (let i of s) t.test(i) ? n++ : a.test(i) && o++;
                            let l = "ltr";
                            if (s.length > 0) {
                                for (let r of s) {
                                    if (t.test(r)) {
                                        l = "rtl";
                                        break
                                    }
                                    if (a.test(r)) {
                                        l = "ltr";
                                        break
                                    }
                                }
                                n > 0 && o > 0 && (l = n >= o ? "rtl" : "ltr")
                            }
                            if (y.textDirection !== l && (y.textDirection = l, p.value)) {
                                let c = p.value.querySelector(".ProseMirror");
                                c && (c.setAttribute("data-dir", l), c.style.direction = l, c.style.textAlign = "rtl" === l ? "right" : "left")
                            }
                        },
                        N = () => {
                            if (h || 0 === u.length) return;
                            h = !0;
                            let e = u.shift();
                            try {
                                g.value && !g.value.isDestroyed && y.editorReady && e()
                            } catch (t) {
                                console.error("Error processing update:", t)
                            } finally {
                                h = !1, u.length > 0 && n.add(N, "normal")
                            }
                        },
                        V = e => {
                            u.push(e), n.add(N, "normal")
                        },
                        I = async () => {
                            if (g.value) {
                                try {
                                    g.value.destroy()
                                } catch (a) {
                                    console.error("Error cleaning up editor:", a)
                                }
                                g.value = null
                            }
                            y.isDestroyed = !1, y.editorReady = !1, u = [];
                            let s = 0,
                                o = async () => {
                                    if (s++, !window.TipTap || !window.TipTap.Editor) return void(s < 20 ? setTimeout(o, 300) : console.error("Failed to load TipTap after maximum attempts"));
                                    let {
                                        Editor: a,
                                        StarterKit: i,
                                        Mention: l,
                                        Placeholder: r,
                                        CharacterCount: d,
                                        Link: m,
                                        Underline: u,
                                        Strike: h,
                                        Code: E,
                                        BubbleMenu: N,
                                        Image: I
                                    } = window.TipTap;
                                    try {
                                        let _ = [];
                                        i && _.push(i.configure({
                                            heading: !1,
                                            blockquote: !1,
                                            horizontalRule: !1,
                                            dropcursor: !1,
                                            gapcursor: !1,
                                            strike: !1,
                                            code: !1,
                                            codeBlock: !1,
                                            history: {
                                                depth: 100,
                                                newGroupDelay: 500
                                            }
                                        })), u && _.push(u), h && _.push(h), E && _.push(E.configure({
                                            HTMLAttributes: {
                                                class: "inline-code"
                                            }
                                        })), I && _.push(I.configure({
                                            inline: !0,
                                            allowBase64: !0,
                                            HTMLAttributes: {
                                                class: "tiptap-emoji-img"
                                            }
                                        }));
                                        let w = (() => {
                                            let {
                                                Extension: t,
                                                InputRule: a
                                            } = window.TipTap;
                                            return t && a ? t.create({
                                                name: "emojiShortcode",
                                                addInputRules: () => [new a({
                                                    find: /:(\d+):\s?$/,
                                                    handler({
                                                        state: t,
                                                        range: a,
                                                        match: s
                                                    }) {
                                                        let n = parseInt(s[1], 10),
                                                            o = e.emojis?.[n];
                                                        if (!o) return null;
                                                        let i = o;
                                                        o.startsWith("http") || o.startsWith("//") || (i = `../../emojis/${o}`);
                                                        let {
                                                            tr: l
                                                        } = t;
                                                        l.delete(a.from, a.to);
                                                        let r = t.schema.nodes.image.create({
                                                            src: i,
                                                            alt: `:${n}:`,
                                                            title: `Emoji ${n}`,
                                                            class: "custom-emoji",
                                                            "data-emoji": `:${n}:`,
                                                            style: "width: 20px; height: 20px; display: inline-block; vertical-align: middle; margin: 0 2px;"
                                                        });
                                                        return l.insert(a.from, r), l.insertText(" ", a.from + 1), l
                                                    }
                                                })],
                                                addProseMirrorPlugins() {
                                                    let {
                                                        Plugin: t,
                                                        PluginKey: a
                                                    } = window.TipTap.PM;
                                                    return t && a ? [new t({
                                                        key: new a("emojiShortcode"),
                                                        props: {
                                                            handleTextInput(t, a, s, n) {
                                                                if (":" === n) {
                                                                    let {
                                                                        state: o
                                                                    } = t, i = o.doc.resolve(a), l = i.parent.textContent.slice(0, i.parentOffset).match(/:(\d+)$/);
                                                                    if (l) {
                                                                        let r = parseInt(l[1], 10),
                                                                            c = e.emojis?.[r];
                                                                        if (c) {
                                                                            let d = c;
                                                                            c.startsWith("http") || c.startsWith("//") || (d = `../../emojis/${c}`);
                                                                            let m = o.tr;
                                                                            m.delete(a - l[0].length, s + 1);
                                                                            let g = o.schema.nodes.image.create({
                                                                                src: d,
                                                                                alt: `:${r}:`,
                                                                                title: `Emoji ${r}`,
                                                                                class: "custom-emoji",
                                                                                "data-emoji": `:${r}:`,
                                                                                style: "width: 20px; height: 20px; display: inline-block; vertical-align: middle; margin: 0 2px;"
                                                                            });
                                                                            return m.insert(a - l[0].length, g), m.insertText(" "), t.dispatch(m), !0
                                                                        }
                                                                    }
                                                                }
                                                                return !1
                                                            }
                                                        }
                                                    })] : []
                                                }
                                            }) : null
                                        })();
                                        w && _.push(w);
                                        let S = (() => {
                                            let {
                                                Mark: e
                                            } = window.TipTap;
                                            return e ? e.create({
                                                name: "spoiler",
                                                inclusive: !1,
                                                excludes: "_",
                                                spanning: !1,
                                                parseHTML: () => [{
                                                    tag: "span[data-spoiler]"
                                                }],
                                                renderHTML: ({
                                                    HTMLAttributes: e
                                                }) => ["span", {
                                                    "data-spoiler": "true",
                                                    class: "spoiler-text",
                                                    ...e
                                                }, 0],
                                                addCommands() {
                                                    return {
                                                        setSpoiler: () => ({
                                                            commands: e
                                                        }) => e.setMark(this.name),
                                                        toggleSpoiler: () => ({
                                                            commands: e
                                                        }) => e.toggleMark(this.name),
                                                        unsetSpoiler: () => ({
                                                            commands: e
                                                        }) => e.unsetMark(this.name)
                                                    }
                                                },
                                                addKeyboardShortcuts() {
                                                    return {
                                                        "Mod-Shift-h": () => this.editor.commands.toggleSpoiler()
                                                    }
                                                }
                                            }) : null
                                        })();
                                        if (S && _.push(S), N && _.push(N.configure({
                                                element: null,
                                                tippyOptions: {
                                                    duration: 100,
                                                    placement: "top"
                                                },
                                                shouldShow: ({
                                                    editor: e,
                                                    view: t,
                                                    state: a,
                                                    oldState: s,
                                                    from: n,
                                                    to: o
                                                }) => n !== o
                                            })), m && _.push(m.configure({
                                                openOnClick: !1,
                                                autolink: !0
                                            })), r && _.push(r.configure({
                                                placeholder: e.placeholder || "اكتب رسالتك هنا..."
                                            })), d && _.push(d.configure({
                                                limit: 500
                                            })), l) {
                                            let x = l.extend({
                                                addInputRules: () => []
                                            });
                                            _.push(x.configure({
                                                HTMLAttributes: {
                                                    class: "input-mention"
                                                },
                                                renderHTML({
                                                    node: t,
                                                    HTMLAttributes: a
                                                }) {
                                                    let s = t.attrs.id || t.attrs.label,
                                                        n = window.MentionService?.isValidMention(s) || {
                                                            valid: !1
                                                        },
                                                        o = e.userId || null;
                                                    return ["span", {
                                                        ...a,
                                                        "data-mention-valid": n.valid,
                                                        "data-mention-type": n.type || "unknown",
                                                        "data-mention-id": s,
                                                        class: window.MentionService?.getMentionClass(s, o) || "mention",
                                                        contenteditable: "false"
                                                    }, `@${t.attrs.label||t.attrs.id}`]
                                                },
                                                suggestion: {
                                                    char: "@",
                                                    allowSpaces: !1,
                                                    startOfLine: !1,
                                                    command({
                                                        editor: e,
                                                        range: t,
                                                        props: a
                                                    }) {
                                                        a.label || a.id, e.chain().focus().deleteRange(t).insertContent({
                                                            type: "mention",
                                                            attrs: {
                                                                id: a.id,
                                                                label: a.label || a.id
                                                            }
                                                        }).insertContent(" ").run()
                                                    },
                                                    items({
                                                        query: t
                                                    }) {
                                                        let a = [];
                                                        if (/^(everyone|here|-?\d+)$/.test(t) && a.push({
                                                                id: t,
                                                                label: t,
                                                                type: "everyone" === t || "here" === t ? "special" : "user",
                                                                isDirectInput: !0
                                                            }), ("" === t || "everyone".includes(t.toLowerCase())) && (a.find(e => "everyone" === e.id) || e.permissions.MentionEveryone && a.push({
                                                                id: "everyone",
                                                                label: "everyone",
                                                                type: "special",
                                                                icon: "\uD83D\uDC65"
                                                            })), window.MentionService?.knownUsers)
                                                            for (let [s, n] of window.MentionService.knownUsers) {
                                                                if (s === String(e.userId)) continue;
                                                                let o = t.replace(/^-/, ""),
                                                                    i = s.replace(/^-/, "");
                                                                if (n.name?.toLowerCase().includes(o.toLowerCase()) || i.includes(o) || s.includes(t)) {
                                                                    let l = s;
                                                                    t.startsWith("-") && !s.startsWith("-") && (l = "-" + i), a.push({
                                                                        id: l,
                                                                        label: n.name || `User ${l}`,
                                                                        type: "user",
                                                                        icon: n.icon,
                                                                        valid: !0
                                                                    })
                                                                }
                                                            }
                                                        if (e.lastFiveMessages?.length) {
                                                            let r = new Set,
                                                                c = String(e.userId || "");
                                                            e.lastFiveMessages.forEach(e => {
                                                                let s = null,
                                                                    n = null;
                                                                if (e.gId && "string" == typeof e.gId) {
                                                                    let o = e.gId.split("_");
                                                                    o.length >= 2 && /^\d+$/.test(o[1]) && (s = o[1], n = o[3] || e.author || e.name)
                                                                } else e.userId && (s = e.userId.toString(), n = e.author || e.name || `User ${s}`);
                                                                if (!s || !n || s === c || String(s) === c || e.userId && String(e.userId) === c) return;
                                                                let i = t.replace(/^-/, "");
                                                                if (!r.has(s) && !a.find(e => e.id === s) && (!t || n.toLowerCase().includes(i.toLowerCase()) || s.includes(i))) {
                                                                    let l = s;
                                                                    t.startsWith("-") && !s.startsWith("-") && (l = "-" + s), r.add(s), a.push({
                                                                        id: l,
                                                                        label: n,
                                                                        type: "user",
                                                                        icon: e.icon || e.avatar,
                                                                        valid: !0
                                                                    })
                                                                }
                                                            })
                                                        }
                                                        return y.mentionSuggestions = a, y.showMentionSuggestions = a.length > 0, a
                                                    },
                                                    render() {
                                                        let e = {};
                                                        return {
                                                            onStart(t) {
                                                                e = t, M = t.command, y.mentionQuery = t.query, y.selectedMentionIndex = 0
                                                            },
                                                            onUpdate(t) {
                                                                e = t, M = t.command, y.mentionQuery = t.query
                                                            },
                                                            onKeyDown(t) {
                                                                if ("Escape" === t.event.key) return y.showMentionSuggestions = !1, !0;
                                                                if (" " === t.event.key) {
                                                                    if (/^(everyone|here|-?\d+)$/.test(y.mentionQuery)) {
                                                                        let a = {
                                                                            id: y.mentionQuery,
                                                                            label: y.mentionQuery
                                                                        };
                                                                        if (e.command) return t.event.preventDefault(), t.event.stopPropagation(), e.command(a), !0
                                                                    }
                                                                    return y.showMentionSuggestions = !1, !1
                                                                }
                                                                if (!y.showMentionSuggestions) return !1;
                                                                if ("Escape" === t.event.key) return t.event.preventDefault(), y.showMentionSuggestions = !1, y.mentionSuggestions = [], y.selectedMentionIndex = 0, !0;
                                                                if ("ArrowUp" === t.event.key) return t.event.preventDefault(), y.selectedMentionIndex = Math.max(0, y.selectedMentionIndex - 1), !0;
                                                                if ("ArrowDown" === t.event.key) return t.event.preventDefault(), y.selectedMentionIndex = Math.min(y.mentionSuggestions.length - 1, y.selectedMentionIndex + 1), !0;
                                                                if ("Enter" === t.event.key || "Tab" === t.event.key) {
                                                                    t.event.preventDefault(), t.event.stopPropagation();
                                                                    let s = y.mentionSuggestions[y.selectedMentionIndex];
                                                                    return s && e.command && (e.command(s), y.showMentionSuggestions = !1, y.mentionSuggestions = [], y.selectedMentionIndex = 0), !0
                                                                }
                                                                return !1
                                                            },
                                                            onExit() {
                                                                y.showMentionSuggestions = !1
                                                            }
                                                        }
                                                    }
                                                }
                                            }))
                                        }
                                        let P = new a({
                                            element: p.value,
                                            extensions: _,
                                            content: e.modelValue || "",
                                            autofocus: !1,
                                            editable: !e.disabled,
                                            injectCSS: !1,
                                            parseOptions: {
                                                preserveWhitespace: "full"
                                            },
                                            editorProps: {
                                                attributes: {
                                                    class: "tiptap-editor",
                                                    spellcheck: "false",
                                                    "data-dir": y.textDirection,
                                                    style: `font-family: ${$()}`
                                                },
                                                handleDOMEvents: {
                                                    async paste(a, s) {
                                                        let n = s.clipboardData || window.clipboardData;
                                                        if (n && e.permissions.ImagesAndLinks?.[0]) {
                                                            let o = n.items,
                                                                i = null;
                                                            for (let l = 0; l < o.length; l++)
                                                                if (-1 !== o[l].type.indexOf("image")) {
                                                                    i = o[l];
                                                                    break
                                                                } if (i) {
                                                                s.preventDefault(), s.stopPropagation();
                                                                let r = i.getAsFile();
                                                                if (r) {
                                                                    if (!r.name || "image.png" === r.name) {
                                                                        let c = Date.now(),
                                                                            d = r.type.split("/")[1] || "png";
                                                                        r = new File([r], `pasted_image_${c}.${d}`, {
                                                                            type: r.type
                                                                        })
                                                                    }
                                                                    let m = await (async e => {
                                                                        try {
                                                                            let t = await e.arrayBuffer(),
                                                                                a = await crypto.subtle.digest("SHA-256", t);
                                                                            return Array.from(new Uint8Array(a)).map(e => e.toString(16).padStart(2, "0")).join("")
                                                                        } catch (s) {
                                                                            return `${e.size}_${e.name}_${e.lastModified}`
                                                                        }
                                                                    })(r);
                                                                    if (y.imageHashes.has(m)) return;
                                                                    y.isUploadingImage = !0, t("imageUpload", {
                                                                        status: "start"
                                                                    });
                                                                    try {
                                                                        let g = new FormData;
                                                                        g.append("image", r), g.append("source", "chat");
                                                                        let p;
                                                                        try {
                                                                            p = await fetch("https://easy.community/request/upload.php", {
                                                                                method: "POST",
                                                                                body: g,
                                                                                mode: "cors",
                                                                                credentials: "omit"
                                                                            })
                                                                        } catch (u) {
                                                                            throw console.error("Network error during upload:", u), Error(`Network error: ${u.message}. Check if the upload URL is correct and the server is reachable.`)
                                                                        }
                                                                        let h = p.headers.get("content-type"),
                                                                            f;
                                                                        try {
                                                                            f = await p.text()
                                                                        } catch (v) {
                                                                            throw console.error("Could not read response body:", v), Error("Failed to read server response")
                                                                        }
                                                                        if (p.ok) {
                                                                            let C;
                                                                            if (!h || !h.includes("application/json")) throw console.error("Non-JSON response from server. Content-Type:", h), console.error("Response body:", f), f.includes("<!DOCTYPE") || f.includes("<html") ? Error("Server returned HTML instead of JSON. The upload.php file may not be installed or configured correctly.") : Error("Server returned non-JSON response. Check console for server output.");
                                                                            try {
                                                                                C = JSON.parse(f)
                                                                            } catch (k) {
                                                                                throw console.error("Failed to parse JSON:", k), console.error("Response was:", f), Error("Server returned invalid JSON. Check console for details.")
                                                                            }
                                                                            if (C.success && C.url) {
                                                                                let E = {
                                                                                    url: C.url,
                                                                                    name: r.name,
                                                                                    type: r.type,
                                                                                    size: r.size,
                                                                                    hash: m
                                                                                };
                                                                                y.uploadedImages.push(E), y.imageHashes.add(m), t("imageUploaded", y.uploadedImages), y.isUploadingImage = !1, t("imageUpload", {
                                                                                    status: "complete",
                                                                                    url: C.url
                                                                                })
                                                                            } else y.isUploadingImage = !1, t("imageUpload", {
                                                                                status: "error",
                                                                                error: C.error || "Unknown error"
                                                                            }), console.error("Upload failed:", C.error || "Unknown error")
                                                                        } else {
                                                                            y.isUploadingImage = !1;
                                                                            let $ = `HTTP ${p.status}`;
                                                                            if (t("imageUpload", {
                                                                                    status: "error",
                                                                                    error: $
                                                                                }), console.error("Upload failed with status:", p.status), console.error("Response body was:", f), f.includes("<!DOCTYPE") || f.includes("<html")) $ = "Server returned HTML. Upload endpoint may not exist or PHP has errors. Check console.";
                                                                            else if (h && h.includes("application/json")) try {
                                                                                let b = JSON.parse(f);
                                                                                b.error && ($ = b.error)
                                                                            } catch (N) {}
                                                                        }
                                                                    } catch (V) {
                                                                        y.isUploadingImage = !1, t("imageUpload", {
                                                                            status: "error",
                                                                            error: V.message
                                                                        }), console.error("Upload error:", V)
                                                                    }
                                                                }
                                                                return !0
                                                            }
                                                        }
                                                        return !1
                                                    },
                                                    keydown(e, a) {
                                                        if (debugLog("INPUT_KEYDOWN", "Key pressed", {
                                                                key: a.key,
                                                                shiftKey: a.shiftKey,
                                                                ctrlKey: a.ctrlKey,
                                                                altKey: a.altKey,
                                                                showMentions: y.showMentionSuggestions,
                                                                editorDestroyed: !g.value || g.value.isDestroyed,
                                                                viewDestroyed: !e,
                                                                isFocused: document.activeElement === e.dom
                                                            }), "ArrowUp" === a.key && !y.showMentionSuggestions) {
                                                            let {
                                                                from: s,
                                                                to: n
                                                            } = e.state.selection, o = e.state.doc.textContent;
                                                            if (0 === s && 0 === n || "" === o || y.historyPosition >= 0) return a.preventDefault(), a.stopPropagation(), C(), !0
                                                        }
                                                        if ("ArrowDown" === a.key && !y.showMentionSuggestions) {
                                                            let {
                                                                from: i,
                                                                to: l
                                                            } = e.state.selection, r = e.state.doc.content.size, c = e.state.doc.textContent;
                                                            if (i >= r - 1 && l >= r - 1 || "" === c || y.historyPosition >= 0) return a.preventDefault(), a.stopPropagation(), k(), !0
                                                        }
                                                        if (y.showMentionSuggestions) {
                                                            if ("Enter" === a.key || "Tab" === a.key) return !1;
                                                            if ("Escape" === a.key) return y.showMentionSuggestions = !1, y.mentionSuggestions = [], y.selectedMentionIndex = 0, !0
                                                        }
                                                        if ("Enter" === a.key && !a.shiftKey && !y.showMentionSuggestions) return debugLog("INPUT_ENTER", "Enter key pressed in input", {
                                                            shiftKey: a.shiftKey,
                                                            showMentions: y.showMentionSuggestions,
                                                            contentLength: T ? T().length : 0,
                                                            historyPosition: y.historyPosition
                                                        }), a.preventDefault(), a.stopPropagation(), t("enter"), debugLog("INPUT_ENTER_EMIT", "Enter event emitted"), !0;
                                                        if (a.ctrlKey || a.metaKey) {
                                                            let d = g.value;
                                                            if (!d || d.isDestroyed) return !1;
                                                            switch (a.key.toLowerCase()) {
                                                                case "b":
                                                                    return a.preventDefault(), V(() => {
                                                                        d.chain().focus().toggleBold().run()
                                                                    }), !0;
                                                                case "i":
                                                                    return a.preventDefault(), V(() => {
                                                                        d.chain().focus().toggleItalic().run()
                                                                    }), !0;
                                                                case "u":
                                                                    return a.preventDefault(), V(() => {
                                                                        d.chain().focus().toggleUnderline().run()
                                                                    }), !0;
                                                                case "s":
                                                                    if (a.shiftKey) return a.preventDefault(), V(() => {
                                                                        d.chain().focus().toggleStrike().run()
                                                                    }), !0;
                                                                    break;
                                                                case "e":
                                                                    return a.preventDefault(), V(() => {
                                                                        d.chain().focus().toggleCode().run()
                                                                    }), !0;
                                                                case "h":
                                                                    if (a.shiftKey) return a.preventDefault(), V(() => {
                                                                        d.commands.toggleSpoiler && d.chain().focus().toggleSpoiler().run()
                                                                    }), !0
                                                            }
                                                        }
                                                        return !1
                                                    }
                                                }
                                            },
                                            onUpdate({
                                                editor: e,
                                                transaction: a
                                            }) {
                                                var s;
                                                if (y.isDestroyed || !y.editorReady || !a.docChanged || a.getMeta("preventUpdate")) return; - 1 === y.historyPosition || a.getMeta("fromHistory") || (y.historyPosition = -1, y.currentDraft = {
                                                    text: "",
                                                    html: "",
                                                    json: null
                                                });
                                                let {
                                                    $from: n
                                                } = e.state.selection;
                                                if (n.marks().some(e => "spoiler" === e.type.name) && a.docChanged) {
                                                    let o = n.nodeAfter,
                                                        i = n.nodeBefore;
                                                    (" " === (i ? i.text?.slice(-1) : "") || o && o.text?.startsWith(" ")) && setTimeout(() => {
                                                        e && !e.isDestroyed && e.commands.unsetMark("spoiler")
                                                    }, 0)
                                                }
                                                let l = T();
                                                b(l), s = l, clearTimeout(f), f = setTimeout(() => {
                                                    s !== v && (v = s, t("update:modelValue", s))
                                                }, 10);
                                                let r = Date.now();
                                                r - y.lastTypingEmit > 1e3 && (y.lastTypingEmit = r, t("typing"))
                                            },
                                            onSelectionUpdate({
                                                editor: e
                                            }) {
                                                let {
                                                    from: t,
                                                    to: a
                                                } = e.state.selection, s = t !== a;
                                                y.showBubbleMenu = s, s && (y.activeFormats.bold = e.isActive("bold"), y.activeFormats.italic = e.isActive("italic"), y.activeFormats.underline = e.isActive("underline"), y.activeFormats.strike = e.isActive("strike"), y.activeFormats.code = e.isActive("code"), y.activeFormats.spoiler = e.isActive("spoiler"))
                                            },
                                            onCreate({
                                                editor: t
                                            }) {
                                                debugLog("EDITOR_CREATE", "Editor created", {
                                                    editorReady: !0,
                                                    isInitialized: !0,
                                                    hasElement: !!p.value,
                                                    hasDom: !!t.view.dom
                                                }), y.editorReady = !0, y.isInitialized = !0, g.value = t, t.on("transaction", ({
                                                    transaction: e
                                                }) => {
                                                    if (!e.docChanged) return;
                                                    let a = !1,
                                                        s = [];
                                                    t.state.doc.descendants((e, n) => {
                                                        if ("mention" === e.type.name) {
                                                            let o = n + e.nodeSize;
                                                            if (o < t.state.doc.content.size) {
                                                                let i = t.state.doc.resolve(o).nodeAfter;
                                                                i && i.isText && i.text?.startsWith(" ") || (s.push(o), a = !0)
                                                            } else s.push(o), a = !0
                                                        }
                                                    }), a && s.length > 0 && n.add(() => {
                                                        if (t.isDestroyed) return;
                                                        s.sort((e, t) => t - e);
                                                        let e = t.state.tr;
                                                        s.forEach(t => {
                                                            t <= e.doc.content.size && e.insertText(" ", t)
                                                        }), e.docChanged && t.view.dispatch(e)
                                                    })
                                                }), (v = T()) && b(v), c(() => {
                                                    let e = p.value?.querySelector(".ProseMirror");
                                                    e && (e.style.fontFamily = $(), y.textDirection && (e.setAttribute("data-dir", y.textDirection), e.style.direction = y.textDirection, e.style.textAlign = "rtl" === y.textDirection ? "right" : "left"))
                                                }), e.disabled || setTimeout(() => {
                                                    t && !t.isDestroyed && y.editorReady && t.commands.focus("end")
                                                }, 100)
                                            },
                                            onDestroy() {
                                                y.editorReady = !1, y.isDestroyed = !0
                                            }
                                        });
                                        g.value = P
                                    } catch (D) {
                                        console.error("Error creating TipTap editor:", D), debugLog("EDITOR_ERROR", "Failed to create editor", {
                                            error: D.toString(),
                                            message: D.message,
                                            stack: D.stack
                                        }), y.isInitialized = !1
                                    }
                                };
                            await o()
                        }, M = null, _ = () => {
                            g.value && !g.value.isDestroyed && y.editorReady && V(() => {
                                try {
                                    v = "", g.value.chain().clearContent().focus().run(), y.uploadedImages = [], y.imageHashes.clear(), y.isUploadingImage = !1, y.historyPosition = -1, y.currentDraft = {
                                        text: "",
                                        html: "",
                                        json: null
                                    }
                                } catch (e) {
                                    console.error("Error clearing content:", e)
                                }
                            })
                        }, w = () => {
                            g.value && !g.value.isDestroyed && y.editorReady && V(() => {
                                try {
                                    g.value.commands.focus("end")
                                } catch (e) {
                                    console.error("Error focusing:", e)
                                }
                            })
                        }, T = () => {
                            if (!g.value || g.value.isDestroyed) return "";
                            try {
                                let e = g.value.state.doc,
                                    t = "";
                                if (e.descendants((e, a) => {
                                        if ("text" === e.type.name) t += e.text;
                                        else if ("mention" === e.type.name) {
                                            let s = e.attrs.id || e.attrs.label;
                                            t += `@${s}`
                                        } else if ("image" === e.type.name) {
                                            let n = e.attrs.alt || "",
                                                o = (e.attrs.src, e.attrs["data-emoji"]),
                                                i = e.attrs["data-native-emoji"];
                                            o ? t += o : i ? t += i : n && (n.startsWith(":") && n.endsWith(":") ? t += n : n.match(/^\d+$/) ? t += ":" + n + ":" : t += n)
                                        } else "hardBreak" !== e.type.name && "paragraph" !== e.type.name || t && !t.endsWith("\n") && (t += "\n")
                                    }), y.stickers.length > 0) {
                                    let a = y.stickers.map(e => e.code).join(" ");
                                    t = a + (t ? " " + t : "")
                                }
                                return t.replace(/\n$/, "")
                            } catch (s) {
                                console.error("Error getting text:", s);
                                try {
                                    return g.value.getText()
                                } catch (n) {
                                    return ""
                                }
                            }
                        }, S = () => {
                            if (!g.value || g.value.isDestroyed) return "";
                            try {
                                return g.value.getHTML()
                            } catch (e) {
                                return console.error("Error getting HTML:", e), ""
                            }
                        }, x = !1;
                    i(() => e.modelValue, e => {
                        if (x) return void(x = !1);
                        if (!g.value || g.value.isDestroyed || !y.editorReady) return;
                        let t = g.value.getText();
                        e !== t && e !== v && V(() => {
                            try {
                                x = !0, v = e || "", g.value.state.tr.setMeta("preventUpdate", !0), g.value.commands.setContent(e || "", !1, {
                                    preserveWhitespace: "full"
                                })
                            } catch (t) {
                                console.error("Error updating content from prop:", t)
                            }
                        })
                    }), i(() => e.messageFont, () => {
                        if (p.value) {
                            let e = p.value.querySelector(".ProseMirror");
                            e && (e.style.fontFamily = $())
                        }
                    });
                    let P = null;
                    return l(() => {
                        debugLog("INPUT_COMPONENT_MOUNT", "Input component mounting", {
                            disabled: e.disabled,
                            hasModelValue: !!e.modelValue,
                            currentChannel: e.currentChannel,
                            hasPermissions: !!e.permissions,
                            hasEmojiData: !!e.emojiData
                        }), I(), setTimeout(() => {
                            debugLog("INPUT_AUTOFOCUS", "Setting up autofocus"), P = (() => {
                                let e = null,
                                    t = () => {
                                        let e = document.activeElement;
                                        if (e) {
                                            let t = e.tagName.toLowerCase(),
                                                a = e.classList.contains("ProseMirror") || e.closest(".tiptap-editor");
                                            if (("input" === t || "textarea" === t || "select" === t) && !a || "true" === e.contentEditable && !a) return !1
                                        }
                                        return !0
                                    },
                                    a = () => {
                                        t() && y.editorReady && g.value && !g.value.isDestroyed && (g.value.isFocused || w())
                                    },
                                    s = t => {
                                        t.target.closest("button, a, input, textarea, select, [contenteditable], .emoji-picker, .options-panel, .channels-panel, .poll-modal") || (clearTimeout(e), e = setTimeout(a, 100))
                                    },
                                    n = e => {
                                        if (t() && !e.ctrlKey && !e.altKey && !e.metaKey) {
                                            let s = e.key;
                                            1 === s.length && /[a-zA-Z0-9]/.test(s) && a()
                                        }
                                    },
                                    o = () => {
                                        document.hidden || setTimeout(a, 200)
                                    };
                                return document.addEventListener("click", s), document.addEventListener("keydown", n), document.addEventListener("visibilitychange", o), window.addEventListener("focus", a), setTimeout(a, 500), () => {
                                    clearTimeout(e), document.removeEventListener("click", s), document.removeEventListener("keydown", n), document.removeEventListener("visibilitychange", o), window.removeEventListener("focus", a)
                                }
                            })()
                        }, 1e3)
                    }), r(() => {
                        if (y.isDestroyed = !0, y.editorReady = !1, P && (P(), P = null), clearTimeout(f), g.value) {
                            try {
                                g.value.destroy()
                            } catch (e) {
                                console.error("Error destroying editor on unmount:", e)
                            }
                            g.value = null
                        }
                        u = []
                    }), {
                        editorElement: p,
                        state: y,
                        clearContent: _,
                        clear: _,
                        insertText(t) {
                            g.value && !g.value.isDestroyed && y.editorReady && V(() => {
                                try {
                                    if ("string" == typeof t) {
                                        let a = [],
                                            s = 0,
                                            n = /:(\d+):/g,
                                            o;
                                        for (; null !== (o = n.exec(t));) {
                                            if (o.index > s) {
                                                let i = t.substring(s, o.index);
                                                a.push({
                                                    type: "text",
                                                    text: i
                                                })
                                            }
                                            let l = parseInt(o[1], 10),
                                                r = e.emojis?.[l];
                                            r ? a.push({
                                                type: "image",
                                                attrs: {
                                                    src: r,
                                                    alt: o[0],
                                                    title: `Emoji ${l}`,
                                                    class: "custom-emoji",
                                                    "data-emoji": o[0],
                                                    contenteditable: "false",
                                                    draggable: "false",
                                                    style: "width: 20px; height: 20px; display: inline-block; vertical-align: middle; margin: 0 2px;"
                                                }
                                            }) : a.push({
                                                type: "text",
                                                text: o[0]
                                            }), s = o.index + o[0].length
                                        }
                                        if (s < t.length) {
                                            let c = t.substring(s);
                                            a.push({
                                                type: "text",
                                                text: c
                                            })
                                        }
                                        return a.length > 0 ? void g.value.chain().focus().setContent(a, !1).run() : void g.value.chain().focus().setContent(t, !1).run()
                                    }
                                    if ("object" == typeof t && (t.isCustom || t.native)) {
                                        if (t.isCustom && t.src) g.value.chain().focus().insertContent([{
                                            type: "image",
                                            attrs: {
                                                src: t.src,
                                                alt: t.shortcodes || t.name,
                                                title: t.name,
                                                class: "custom-emoji",
                                                style: "width: 20px; height: 20px; display: inline-block; vertical-align: middle; margin: 0 2px;"
                                            }
                                        }, {
                                            type: "text",
                                            text: " "
                                        }]).run();
                                        else if (t.native) {
                                            let d = E(t.native);
                                            d ? g.value.chain().focus().insertContent([{
                                                type: "image",
                                                attrs: {
                                                    src: d,
                                                    alt: t.native,
                                                    title: t.name || t.native,
                                                    class: "apple-emoji",
                                                    "data-native-emoji": t.native,
                                                    style: "width: 16px; height: 16px; display: inline-block; vertical-align: text-bottom; margin: 0 1px;"
                                                }
                                            }, {
                                                type: "text",
                                                text: " "
                                            }]).run() : g.value.chain().focus().insertContent(t.native + " ").run()
                                        }
                                    } else g.value.chain().focus().insertContent(t).run()
                                } catch (m) {
                                    console.error("Error inserting text:", m)
                                }
                            })
                        },
                        insertEmoji(e) {
                            g.value && !g.value.isDestroyed && y.editorReady && V(() => {
                                try {
                                    if ("object" == typeof e && e.isCustom && e.src) {
                                        let t = e.shortcodes || e.native || e.name || "";
                                        t.startsWith(":") || (t = `:${t}`), t.endsWith(":") || (t = `${t}:`), g.value.chain().focus().setImage({
                                            src: e.src,
                                            alt: t,
                                            title: e.name || t,
                                            class: "custom-emoji",
                                            "data-emoji": t,
                                            style: "width: 20px; height: 20px; display: inline-block; vertical-align: middle; margin: 0 2px;"
                                        }).insertContent(" ").run()
                                    } else if ("object" == typeof e && e.native) {
                                        let a = E(e.native);
                                        a ? g.value.chain().focus().setImage({
                                            src: a,
                                            alt: e.native,
                                            title: e.name || e.native,
                                            class: "apple-emoji",
                                            "data-native-emoji": e.native,
                                            style: "width: 20px; height: 20px; display: inline-block; vertical-align: middle; margin: 0 2px;"
                                        }).insertContent(" ").run() : g.value.chain().focus().insertContent(e.native + " ").run()
                                    } else {
                                        let s = "string" == typeof e ? e : e.native || e;
                                        g.value.chain().focus().insertContent(s + " ").run()
                                    }
                                } catch (n) {
                                    console.error("Error inserting emoji:", n)
                                }
                            })
                        },
                        focus: w,
                        blur() {
                            g.value && !g.value.isDestroyed && y.editorReady && V(() => {
                                try {
                                    g.value.commands.blur()
                                } catch (e) {
                                    console.error("Error blurring:", e)
                                }
                            })
                        },
                        getText: T,
                        getHTML: S,
                        getFormattedContent() {
                            if (!g.value || g.value.isDestroyed) return "";
                            try {
                                let e = g.value.state.doc,
                                    t = "",
                                    a = !0;
                                if (e.descendants((e, s) => {
                                        if ("text" === e.type.name) {
                                            let n = e.text;
                                            e.marks.forEach(e => {
                                                "bold" === e.type.name ? n = `[b]${n}[/b]` : "italic" === e.type.name ? n = `[i]${n}[/i]` : "underline" === e.type.name ? n = `[u]${n}[/u]` : "strike" === e.type.name ? n = `[s]${n}[/s]` : "code" === e.type.name ? n = `[code]${n}[/code]` : "spoiler" === e.type.name && (n = `[spoiler]${n}[/spoiler]`)
                                            }), t += n
                                        } else if ("mention" === e.type.name) {
                                            let o = e.attrs.id || e.attrs.label;
                                            t += `@${o}`
                                        } else if ("image" === e.type.name) {
                                            let i = e.attrs.alt || "",
                                                l = e.attrs["data-emoji"],
                                                r = e.attrs["data-native-emoji"];
                                            l ? t += l : r ? t += r : i && (i.startsWith(":") && i.endsWith(":") ? t += i : i.match(/^\d+$/) ? t += ":" + i + ":" : t += i)
                                        } else "hardBreak" === e.type.name ? t += "\n" : "paragraph" === e.type.name && (!a && s > 0 && (t += "\n"), a = !1)
                                    }), y.stickers.length > 0) {
                                    let s = y.stickers.map(e => e.code).join(" ");
                                    t = s + (t ? " " + t : "")
                                }
                                return t = t.replace(/\n+$/, "")
                            } catch (n) {
                                return console.error("Error getting formatted content:", n), T()
                            }
                        },
                        selectMention(e) {
                            if (g.value && !g.value.isDestroyed && y.editorReady) {
                                if (M) try {
                                    M(e), y.showMentionSuggestions = !1, y.mentionSuggestions = [], y.selectedMentionIndex = 0, g.value.commands.focus()
                                } catch (t) {
                                    console.error("Error inserting mention:", t);
                                    try {
                                        g.value.chain().focus().insertContent({
                                            type: "mention",
                                            attrs: {
                                                id: e.id,
                                                label: e.label || e.id
                                            }
                                        }).insertContent(" ").run()
                                    } catch (a) {
                                        console.error("Fallback mention insertion failed:", a)
                                    }
                                } else try {
                                    g.value.chain().focus().insertContent({
                                        type: "mention",
                                        attrs: {
                                            id: e.id,
                                            label: e.label || e.id
                                        }
                                    }).insertContent(" ").run(), y.showMentionSuggestions = !1, y.mentionSuggestions = [], y.selectedMentionIndex = 0
                                } catch (s) {
                                    console.error("Direct mention insertion failed, trying plain text:", s);
                                    try {
                                        g.value.chain().focus().insertContent(`@${e.label||e.id} `).run(), y.showMentionSuggestions = !1, y.mentionSuggestions = [], y.selectedMentionIndex = 0
                                    } catch (n) {
                                        console.error("Plain text insertion also failed:", n)
                                    }
                                }
                            }
                        },
                        formatText(e) {
                            g.value && !g.value.isDestroyed && y.editorReady && V(() => {
                                try {
                                    switch (e) {
                                        case "bold":
                                            g.value.chain().focus().toggleBold().run();
                                            break;
                                        case "italic":
                                            g.value.chain().focus().toggleItalic().run();
                                            break;
                                        case "underline":
                                            g.value.chain().focus().toggleUnderline().run();
                                            break;
                                        case "strike":
                                            g.value.chain().focus().toggleStrike().run();
                                            break;
                                        case "code":
                                            g.value.chain().focus().toggleCode().run();
                                            break;
                                        case "spoiler":
                                            g.value.chain().focus().toggleSpoiler().run()
                                    }
                                    setTimeout(() => {
                                        y.activeFormats.bold = g.value.isActive("bold"), y.activeFormats.italic = g.value.isActive("italic"), y.activeFormats.underline = g.value.isActive("underline"), y.activeFormats.strike = g.value.isActive("strike"), y.activeFormats.code = g.value.isActive("code"), y.activeFormats.spoiler = g.value.isActive("spoiler")
                                    }, 0)
                                } catch (t) {
                                    console.error("Error formatting text:", t)
                                }
                            })
                        },
                        removeSticker(e) {
                            var a;
                            let s = `:${e}:`;
                            y.actualText = y.actualText.replace(s, "").trim(), a = y.actualText, y.stickers = [], y.actualText = a, y.displayText = a, t("update:modelValue", y.actualText)
                        },
                        getUploadedImages: () => y.uploadedImages,
                        clearUploadedImages() {
                            y.uploadedImages = [], y.imageHashes.clear(), y.isUploadingImage = !1
                        },
                        removeUploadedImage(e) {
                            let a = y.uploadedImages[e];
                            a && a.hash && y.imageHashes.delete(a.hash), y.uploadedImages.splice(e, 1), t("imageUploaded", y.uploadedImages)
                        },
                        isUploadingImage: o(() => y.isUploadingImage),
                        addToHistory(e) {
                            if (!e || "" === e.trim()) return;
                            let t = S(),
                                a = g.value ? g.value.getJSON() : null,
                                s = {
                                    text: e,
                                    html: t,
                                    json: a,
                                    timestamp: Date.now()
                                },
                                n = y.messageHistory.findIndex(t => "string" == typeof t && t === e || t.text === e);
                            n > -1 && y.messageHistory.splice(n, 1), y.messageHistory.push(s), y.messageHistory.length > 20 && (y.messageHistory = y.messageHistory.slice(-20)), y.historyPosition = -1, y.currentDraft = {
                                text: "",
                                html: "",
                                json: null
                            }
                        },
                        navigateHistoryUp: C,
                        navigateHistoryDown: k
                    }
                },
                render: function(e, t) {
                    return _openBlock(), _createElementBlock("div", {
                        class: _normalizeClass(["tiptap-input-wrapper", {
                            "uploading-image": e.state.isUploadingImage
                        }])
                    }, [_createCommentVNode(" Editor Container "), _createElementVNode("div", {
                        ref: "editorElement",
                        class: _normalizeClass(["tiptap-editor-container", {
                            disabled: e.state.isUploadingImage
                        }])
                    }, null, 2), _createCommentVNode(" Minimal Upload Indicator inside input "), _createVNode(_Transition, {
                        name: "fade"
                    }, {
                        default: _withCtx(() => [e.state.isUploadingImage ? (_openBlock(), _createElementBlock("div", {
                            key: 0,
                            class: "minimal-upload-indicator"
                        }, [_createElementVNode("i", {
                            class: "fa-solid fa-spinner fa-spin"
                        }), _createElementVNode("span", null, "رفع...")])) : _createCommentVNode("v-if", !0)]),
                        _: 1
                    }), _createCommentVNode(" Bubble Menu for formatting "), e.state.showBubbleMenu ? (_openBlock(), _createElementBlock("div", {
                        key: 0,
                        class: "tiptap-bubble-menu"
                    }, [_createElementVNode("button", {
                        onClick: t => e.formatText("bold"),
                        class: _normalizeClass({
                            active: e.state.activeFormats.bold
                        }),
                        title: "غامق (Ctrl+B)"
                    }, [_createElementVNode("i", {
                        class: "fa-solid fa-bold"
                    })], 10, ["onClick"]), _createElementVNode("button", {
                        onClick: t => e.formatText("italic"),
                        class: _normalizeClass({
                            active: e.state.activeFormats.italic
                        }),
                        title: "مائل (Ctrl+I)"
                    }, [_createElementVNode("i", {
                        class: "fa-solid fa-italic"
                    })], 10, ["onClick"]), _createElementVNode("button", {
                        onClick: t => e.formatText("underline"),
                        class: _normalizeClass({
                            active: e.state.activeFormats.underline
                        }),
                        title: "تسطير (Ctrl+U)"
                    }, [_createElementVNode("i", {
                        class: "fa-solid fa-underline"
                    })], 10, ["onClick"]), _createElementVNode("button", {
                        onClick: t => e.formatText("strike"),
                        class: _normalizeClass({
                            active: e.state.activeFormats.strike
                        }),
                        title: "يتوسطه خط (Ctrl+Shift+S)"
                    }, [_createElementVNode("i", {
                        class: "fa-solid fa-strikethrough"
                    })], 10, ["onClick"]), _createElementVNode("button", {
                        onClick: t => e.formatText("code"),
                        class: _normalizeClass({
                            active: e.state.activeFormats.code
                        }),
                        title: "كود (Ctrl+E)"
                    }, [_createElementVNode("i", {
                        class: "fa-solid fa-code"
                    })], 10, ["onClick"]), _createElementVNode("button", {
                        onClick: t => e.formatText("spoiler"),
                        class: _normalizeClass({
                            active: e.state.activeFormats.spoiler
                        }),
                        title: "إخفاء (Ctrl+Shift+H)"
                    }, [_createElementVNode("i", {
                        class: "fa-solid fa-eye-slash"
                    })], 10, ["onClick"])])) : _createCommentVNode("v-if", !0), _createCommentVNode(" Mention Suggestions "), _createVNode(_Transition, {
                        name: "dropdown-fade"
                    }, {
                        default: _withCtx(() => [e.state.showMentionSuggestions && e.state.mentionSuggestions.length ? (_openBlock(), _createElementBlock("div", {
                            key: 0,
                            class: "mention-suggestions-panel"
                        }, [(_openBlock(!0), _createElementBlock(_Fragment, null, _renderList(e.state.mentionSuggestions, (t, a) => (_openBlock(), _createElementBlock("div", {
                            key: t.id,
                            class: _normalizeClass(["mention-suggestion-item", {
                                selected: a === e.state.selectedMentionIndex
                            }]),
                            onClick: a => e.selectMention(t),
                            onMouseenter: t => e.state.selectedMentionIndex = a
                        }, [_createCommentVNode(" Avatar "), _createElementVNode("div", {
                            class: _normalizeClass(["mention-avatar", {
                                "special-mention": "special" === t.type
                            }])
                        }, [t.icon && "special" !== t.type ? (_openBlock(), _createElementBlock("img", {
                            key: 0,
                            src: t.icon,
                            alt: t.label
                        }, null, 8, ["src", "alt"])) : "special" === t.type && "everyone" === t.id ? (_openBlock(), _createElementBlock("i", {
                            key: 1,
                            class: "fas fa-users"
                        })) : "special" === t.type && "here" === t.id ? (_openBlock(), _createElementBlock("i", {
                            key: 2,
                            class: "fas fa-broadcast-tower"
                        })) : (_openBlock(), _createElementBlock("span", {
                            key: 3,
                            class: "avatar-placeholder"
                        }, _toDisplayString(t.label ? t.label.charAt(0).toUpperCase() : t.id.charAt(0)), 1))], 2), _createCommentVNode(" User Info "), _createElementVNode("div", {
                            class: "mention-user-info"
                        }, [_createElementVNode("div", {
                            class: "mention-user-name"
                        }, _toDisplayString(t.label || "User" + t.id), 1), _createElementVNode("div", {
                            class: "mention-user-id"
                        }, [_createElementVNode("span", {
                            class: "at-symbol"
                        }, "@"), _createElementVNode("span", null, _toDisplayString(t.id), 1)])]), _createCommentVNode(" Badge for special mentions "), "special" === t.type ? (_openBlock(), _createElementBlock("span", {
                            key: 0,
                            class: _normalizeClass(["mention-badge", t.id])
                        }, _toDisplayString(t.id), 3)) : _createCommentVNode("v-if", !0)], 42, ["onClick", "onMouseenter"]))), 128))])) : _createCommentVNode("v-if", !0)]),
                        _: 1
                    })], 2)
                }
            },
            TypingIndicator: s,
            EmojiPicker: e,
            SearchBar: a,
            PollsPanel: {
                props: {
                    currentChannel: String,
                    permissions: Object,
                    userId: [String, Number]
                },
                setup(e, {
                    emit: t
                }) {
                    let a = reactive({
                            question: "",
                            options: ["", ""],
                            duration: 60,
                            isCreating: !1,
                            error: null,
                            success: null,
                            durationPresets: [{
                                label: "30 ثانية",
                                value: 30
                            }, {
                                label: "دقيقة",
                                value: 60
                            }, {
                                label: "2 دقيقة",
                                value: 120
                            }, {
                                label: "5 دقائق",
                                value: 300
                            }],
                            minQuestionLength: 5,
                            maxQuestionLength: 200,
                            minOptionLength: 1,
                            maxOptionLength: 50,
                            minOptions: 2,
                            maxOptions: 4
                        }),
                        s = computed(() => !1 !== e.permissions?.createPolls),
                        n = computed(() => {
                            let e = a.options.map(e => e.trim().toLowerCase()).filter(e => e.length > 0),
                                t = new Set(e);
                            return e.length !== t.size
                        }),
                        o = computed(() => a.question.trim().length >= a.minQuestionLength),
                        i = computed(() => !(a.question.trim().length < a.minQuestionLength) && !(a.question.trim().length > a.maxQuestionLength) && !n.value && a.options.filter(e => e.trim().length >= a.minOptionLength && e.trim().length <= a.maxOptionLength).length >= a.minOptions),
                        l = computed(() => {
                            let e = Math.floor(a.duration / 60),
                                t = a.duration % 60;
                            return e > 0 && t > 0 ? `${e} دقيقة و ${t} ثانية` : e > 0 ? 1 === e ? "دقيقة واحدة" : `${e} دقائق` : `${t} ثانية`
                        }),
                        r = computed(() => `${a.question.length} / ${a.maxQuestionLength}`),
                        c = computed(() => !(a.options.length >= a.maxOptions) && a.options.every(e => e.trim().length > 0)),
                        d = () => {
                            a.question = "", a.options = ["", ""], a.duration = 300, a.error = null, a.success = null
                        },
                        m = async () => {
                            if (i.value && !a.isCreating) {
                                a.isCreating = !0, a.error = null, a.success = null;
                                try {
                                    let s = a.options.map(e => e.trim()).filter(e => e.length >= a.minOptionLength),
                                        n = {
                                            channelId: e.currentChannel,
                                            question: a.question.trim(),
                                            options: s,
                                            duration: a.duration
                                        },
                                        o = "function" == typeof GetParentResourceName ? GetParentResourceName() : "Easy-Chat-Max";
                                    if (window.RequestThrottler && !window.RequestThrottler.canRequest("createPoll", 1e4)) {
                                        let l = window.RequestThrottler.getCooldown("createPoll", 1e4);
                                        return void(a.error = `يرجى الانتظار ${Math.ceil(l/1e3)} ثانية قبل إنشاء استطلاع آخر`)
                                    }
                                    let r = await fetch(`https://${o}/createPoll`, {
                                            method: "POST",
                                            headers: {
                                                "Content-Type": "application/json"
                                            },
                                            body: JSON.stringify(n)
                                        }),
                                        c = await r.json();
                                    "ok" === c || c.success ? (a.success = "تم إنشاء الاستطلاع بنجاح!", d(), setTimeout(() => {
                                        t("close")
                                    }, 1500)) : a.error = c.message || "فشل في إنشاء الاستطلاع"
                                } catch (m) {
                                    console.error("[PollsPanel] Error creating poll:", m), a.error = "حدث خطأ أثناء إنشاء الاستطلاع"
                                } finally {
                                    a.isCreating = !1
                                }
                            }
                        };
                    return onMounted(() => {
                        let e = document.querySelector(".poll-question-input");
                        e && e.focus()
                    }), {
                        ...toRefs(a),
                        canCreatePoll: s,
                        canAddOption: c,
                        isFormValid: i,
                        isQuestionValid: o,
                        hasDuplicateOptions: n,
                        formattedDuration: l,
                        questionCharCount: r,
                        addOption() {
                            c.value && a.options.push("")
                        },
                        removeOption(e) {
                            a.options.length > a.minOptions && a.options.splice(e, 1)
                        },
                        updateOption(e, t) {
                            a.options[e] = t
                        },
                        isDuplicateOption(e) {
                            if (!e || 0 === e.trim().length) return !1;
                            let t = e.trim().toLowerCase();
                            return a.options.filter(e => e.trim().toLowerCase() === t).length > 1
                        },
                        setDuration(e) {
                            a.duration = e
                        },
                        resetForm: d,
                        createPoll: m,
                        handleKeyPress(e) {
                            "Enter" === e.key && !e.shiftKey && i.value && (e.preventDefault(), m())
                        }
                    }
                },
                render: function(e, t) {
                    return _openBlock(), _createElementBlock("div", {
                        class: "polls-panel",
                        dir: "rtl"
                    }, [_createElementVNode("div", {
                        class: "polls-panel-header"
                    }, [_createElementVNode("button", {
                        onClick: t => e.$emit("close"),
                        class: "panel-close-btn"
                    }, [_createElementVNode("i", {
                        class: "fa-solid fa-times"
                    })], 8, ["onClick"]), _createElementVNode("h3", {
                        class: "panel-title"
                    }, [_createTextVNode(" إنشاء استطلاع "), _createElementVNode("i", {
                        class: "fa-solid fa-square-poll-vertical"
                    })])]), _createElementVNode("div", {
                        class: "polls-panel-content"
                    }, [_createCommentVNode(" Permission check "), e.canCreatePoll ? (_openBlock(), _createElementBlock(_Fragment, {
                        key: 1
                    }, [_createCommentVNode(" Poll creation form "), _createElementVNode("div", {
                        class: "poll-creation-form"
                    }, [_createCommentVNode(" Question input "), _createElementVNode("div", {
                        class: "poll-form-group"
                    }, [_createElementVNode("label", {
                        class: "poll-label"
                    }, [_createElementVNode("span", null, "ما هو سؤالك؟"), _createElementVNode("span", {
                        class: _normalizeClass(["char-count", {
                            error: e.question.length > 0 && e.question.length < e.minQuestionLength
                        }])
                    }, _toDisplayString(e.question.length) + "/" + _toDisplayString(e.maxQuestionLength), 3)]), _withDirectives(_createElementVNode("textarea", {
                        "onUpdate:modelValue": t => e.question = t,
                        class: _normalizeClass(["poll-question-input", {
                            "has-error": e.question.length > 0 && e.question.length < e.minQuestionLength
                        }]),
                        placeholder: "اكتب السؤال الذي تريد طرحه...",
                        maxlength: e.maxQuestionLength,
                        onKeydown: e.handleKeyPress,
                        rows: "2"
                    }, "				", 42, ["onUpdate:modelValue", "maxlength", "onKeydown"]), [
                        [_vModelText, e.question]
                    ]), e.question.length > 0 && e.question.length < e.minQuestionLength ? (_openBlock(), _createElementBlock("div", {
                        key: 0,
                        class: "field-error"
                    }, [_createElementVNode("i", {
                        class: "fa-solid fa-info-circle"
                    }), _createTextVNode(" السؤال يجب أن يكون " + _toDisplayString(e.minQuestionLength) + " أحرف على الأقل ", 1)])) : _createCommentVNode("v-if", !0)]), _createCommentVNode(" Options "), _createElementVNode("div", {
                        class: "poll-form-group"
                    }, [_createElementVNode("label", {
                        class: "poll-label"
                    }, [_createElementVNode("span", null, "الخيارات المتاحة"), _createElementVNode("span", {
                        class: "options-count"
                    }, _toDisplayString(e.options.filter(e => e.trim()).length) + " خيارات", 1)]), e.hasDuplicateOptions ? (_openBlock(), _createElementBlock("div", {
                        key: 0,
                        class: "field-warning"
                    }, [_createElementVNode("i", {
                        class: "fa-solid fa-exclamation-triangle"
                    }), _createTextVNode(" لا يمكن إضافة خيارات مكررة ")])) : _createCommentVNode("v-if", !0), _createElementVNode("div", {
                        class: "poll-options-list"
                    }, [(_openBlock(!0), _createElementBlock(_Fragment, null, _renderList(e.options, (t, a) => (_openBlock(), _createElementBlock("div", {
                        key: a,
                        class: "poll-option-item"
                    }, [e.options.length > e.minOptions ? (_openBlock(), _createElementBlock("button", {
                        key: 0,
                        onClick: t => e.removeOption(a),
                        class: "remove-option-btn",
                        title: "حذف"
                    }, [_createElementVNode("i", {
                        class: "fa-solid fa-minus"
                    })], 8, ["onClick"])) : _createCommentVNode("v-if", !0), _createElementVNode("input", {
                        value: t,
                        onInput: t => e.updateOption(a, t.target.value),
                        class: _normalizeClass(["poll-option-input", {
                            "has-error": e.isDuplicateOption(t)
                        }]),
                        placeholder: "اكتب الخيار رقم " + (a + 1),
                        maxlength: e.maxOptionLength,
                        onKeydown: e.handleKeyPress
                    }, null, 42, ["value", "onInput", "placeholder", "maxlength", "onKeydown"]), _createElementVNode("div", {
                        class: "option-number"
                    }, _toDisplayString(a + 1), 1)]))), 128)), e.options.length < e.maxOptions ? (_openBlock(), _createElementBlock("button", {
                        key: 0,
                        onClick: e.addOption,
                        class: _normalizeClass(["add-option-btn", {
                            disabled: !e.canAddOption
                        }]),
                        disabled: !e.canAddOption,
                        title: e.canAddOption ? "" : "يجب ملء جميع الخيارات الحالية أولاً"
                    }, [_createElementVNode("i", {
                        class: "fa-solid fa-plus"
                    }), _createElementVNode("span", null, _toDisplayString(e.canAddOption ? "إضافة خيار جديد" : "املأ الخيارات الحالية أولاً"), 1)], 10, ["onClick", "disabled", "title"])) : _createCommentVNode("v-if", !0)])]), _createCommentVNode(" Duration "), _createElementVNode("div", {
                        class: "poll-form-group"
                    }, [_createElementVNode("label", {
                        class: "poll-label"
                    }, [_createElementVNode("span", null, "مدة الاستطلاع"), _createElementVNode("span", {
                        class: "duration-display"
                    }, _toDisplayString(e.formattedDuration), 1)]), _createElementVNode("div", {
                        class: "duration-quick-select"
                    }, [(_openBlock(!0), _createElementBlock(_Fragment, null, _renderList(e.durationPresets.slice(0, 4), t => (_openBlock(), _createElementBlock("button", {
                        key: t.value,
                        onClick: a => e.setDuration(t.value),
                        class: _normalizeClass(["duration-btn", {
                            active: e.duration === t.value
                        }])
                    }, _toDisplayString(t.label), 11, ["onClick"]))), 128))])]), _createCommentVNode(" Error/Success messages "), e.error ? (_openBlock(), _createElementBlock("div", {
                        key: 0,
                        class: "poll-error-message"
                    }, [_createElementVNode("i", {
                        class: "fa-solid fa-exclamation-circle"
                    }), _createTextVNode(" " + _toDisplayString(e.error), 1)])) : _createCommentVNode("v-if", !0), e.success ? (_openBlock(), _createElementBlock("div", {
                        key: 1,
                        class: "poll-success-message"
                    }, [_createElementVNode("i", {
                        class: "fa-solid fa-check-circle"
                    }), _createTextVNode(" " + _toDisplayString(e.success), 1)])) : _createCommentVNode("v-if", !0), _createCommentVNode(" Action buttons "), _createElementVNode("div", {
                        class: "poll-form-actions"
                    }, [_createElementVNode("button", {
                        onClick: e.createPoll,
                        class: _normalizeClass(["poll-submit-btn", {
                            disabled: !e.isFormValid || e.isCreating
                        }]),
                        disabled: !e.isFormValid || e.isCreating
                    }, [e.isCreating ? (_openBlock(), _createElementBlock("i", {
                        key: 1,
                        class: "fa-solid fa-spinner fa-spin"
                    })) : (_openBlock(), _createElementBlock("i", {
                        key: 0,
                        class: "fa-solid fa-check"
                    })), _createElementVNode("span", null, _toDisplayString(e.isCreating ? "جاري الإنشاء..." : "إنشاء"), 1)], 10, ["onClick", "disabled"]), _createElementVNode("button", {
                        onClick: e.resetForm,
                        class: "poll-reset-btn",
                        disabled: e.isCreating
                    }, [_createElementVNode("i", {
                        class: "fa-solid fa-trash"
                    }), _createElementVNode("span", null, "مسح")], 8, ["onClick", "disabled"])])])], 2112)) : (_openBlock(), _createElementBlock("div", {
                        key: 0,
                        class: "poll-permission-error"
                    }, [_createElementVNode("i", {
                        class: "fa-solid fa-lock"
                    }), _createElementVNode("p", null, "ليس لديك صلاحية إنشاء استطلاعات")]))])])
                }
            },
            QuickChannelSwitcher: {
                name: "QuickChannelSwitcher",
                props: {
                    currentChannel: String,
                    channels: Array,
                    show: Boolean
                },
                emits: ["switch-channel", "close"],
                setup(e, {
                    emit: t
                }) {
                    let {
                        reactive: a,
                        computed: s,
                        onMounted: n,
                        onUnmounted: o,
                        nextTick: i,
                        toRefs: l,
                        watch: r
                    } = Vue, c = a({
                        staticChannels: [{
                            id: "شات العام",
                            title: "شات العام",
                            color: "#ffffff",
                            canSend: !0
                        }]
                    });
                    r(() => e.channels, e => {
                        if (e && e.length > 0) {
                            let t = e.find(e => "شات العام" === e.Title);
                            c.staticChannels = [{
                                id: "شات العام",
                                title: "شات العام",
                                color: "#ffffff",
                                canSend: !0,
                                unreadCount: t?.unreadCount || 0
                            }], e.forEach(e => {
                                "شات العام" !== e.Title && c.staticChannels.push({
                                    id: e.Title,
                                    title: e.Title,
                                    color: e.color || "#ffffff",
                                    canSend: !1 !== e.send,
                                    unreadCount: e.unreadCount || 0
                                })
                            })
                        }
                    }, {
                        immediate: !0,
                        deep: !0
                    }), r(() => e.channels?.map(e => e.unreadCount), () => {
                        e.channels && e.channels.forEach(e => {
                            let t = c.staticChannels.find(t => t.id === e.Title);
                            t && (t.unreadCount = e.unreadCount || 0)
                        })
                    }, {
                        deep: !0
                    }), r(() => e.show, e => {});
                    let d = a => {
                            if (a.altKey && a.key >= "1" && a.key <= "9") {
                                let s = parseInt(a.key) - 1;
                                s < c.staticChannels.length && m(c.staticChannels[s].id)
                            } else {
                                if ((a.ctrlKey || a.metaKey) && "k" === a.key) return a.preventDefault(), void t("close");
                                if (e.show) switch (a.key) {
                                    case "ArrowDown":
                                    case "ArrowUp":
                                    case "Enter":
                                        break;
                                    case "Escape":
                                        t("close")
                                }
                            }
                        },
                        m = e => {
                            t("close"), fetch("https://Easy-Chat-Max/channels:switch", {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json"
                                },
                                body: JSON.stringify({
                                    channel_id: e,
                                    channel_type: "static"
                                })
                            }).catch(e => {
                                console.error("Failed to switch channel:", e)
                            }), t("switch-channel", e, "static")
                        },
                        g = a => {
                            if (!e.show) return;
                            let s = document.querySelector(".quick-channel-switcher"),
                                n = document.querySelector(".channels-toggle-btn");
                            !s || s.contains(a.target) || n?.contains(a.target) || t("close")
                        },
                        p = s(() => c.staticChannels),
                        u = s(() => {
                            let t = c.staticChannels.find(t => t.id === e.currentChannel || t.title === e.currentChannel);
                            return t ? t.title : e.currentChannel
                        });
                    return n(() => {
                        document.addEventListener("keydown", d), document.addEventListener("click", g), fetch("https://Easy-Chat-Max/channels:ready", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({})
                        }).catch(e => {
                            console.error("Failed to load initial channels:", e)
                        })
                    }), o(() => {
                        document.removeEventListener("keydown", d), document.removeEventListener("click", g)
                    }), {
                        ...l(c),
                        filteredChannels: p,
                        currentChannelDisplay: u,
                        switchChannel: m
                    }
                },
                render: function(e, t) {
                    return _openBlock(), _createElementBlock("div", {
                        class: "quick-channel-switcher"
                    }, [_createCommentVNode(" Dropdown Only - No toggle button here "), _createVNode(_Transition, {
                        name: "dropdown-fade"
                    }, {
                        default: _withCtx(() => [_createElementVNode("div", {
                            class: "channel-dropdown"
                        }, [_createCommentVNode(" Channels List "), _createElementVNode("div", {
                            class: "channel-list"
                        }, [(_openBlock(!0), _createElementBlock(_Fragment, null, _renderList(e.filteredChannels, (t, a) => (_openBlock(), _createElementBlock("div", {
                            key: t.id,
                            class: _normalizeClass(["channel-option", {
                                active: e.currentChannel === t.id || e.currentChannel === t.title,
                                "has-unread": t.unreadCount > 0
                            }]),
                            onClick: a => e.switchChannel(t.id)
                        }, [_createElementVNode("span", {
                            class: "channel-hash",
                            style: _normalizeStyle({
                                color: t.color
                            })
                        }, "#", 4), _createElementVNode("span", {
                            class: "channel-name"
                        }, _toDisplayString(t.title), 1), t.unreadCount > 0 ? (_openBlock(), _createElementBlock("span", {
                            key: 0,
                            class: "channel-unread-count"
                        }, _toDisplayString(t.unreadCount > 99 ? "99+" : t.unreadCount), 1)) : _createCommentVNode("v-if", !0), t.canSend ? _createCommentVNode("v-if", !0) : (_openBlock(), _createElementBlock("span", {
                            key: 1,
                            class: "channel-badge"
                        }, "عرض فقط"))], 10, ["onClick"]))), 128))])])]),
                        _: 1
                    })])
                }
            },
            OptionsPanel: {
                name: "options-panel",
                props: {
                    show: Boolean,
                    storage: Object,
                    permissions: Object,
                    currentTheme: String,
                    isMuted: Boolean,
                    hideAvatars: Boolean,
                    enableGrouping: Boolean,
                    hasAdminPermissions: Boolean,
                    showTypingIndicator: {
                        type: Boolean,
                        default: !0
                    },
                    typingDisabledByServer: {
                        type: Boolean,
                        default: !1
                    },
                    messageContext: {
                        type: Object,
                        default: null
                    },
                    userId: {
                        type: [String, Number],
                        default: null
                    },
                    chat: {
                        type: Object,
                        default: () => ({})
                    }
                },
                data() {
                    return {
                        activeTab: this.messageContext ? "general" : "quick",
                        hoveredOption: null,
                        tooltipVisible: !1,
                        tooltipText: "",
                        tooltipX: 0,
                        tooltipY: 0,
                        selectedNameColor: this.storage?.messageColorRgb ? this.rgbToHex(this.storage.messageColorRgb) : "#ffffff",
                        cosmeticsEnabled: this.storage?.cosmeticsEnabled ?? !1,
                        sendAnimation: this.storage?.sendAnimation || "fadeIn",
                        animationLoopInterval: null,
                        selectedMuteDuration: 10,
                        isUserMuted: !1,
                        mutedUsersList: [],
                        manualMuteUserId: "",
                        manualMuteDuration: 10,
                        isManualMuting: !1,
                        muteError: "",
                        muteSuccess: "",
                        reactionDetails: {},
                        reactionLoading: !1,
                        reactionError: null,
                        activeReactionTab: null,
                        animations: [{
                            id: "fadeIn",
                            name: "تلاشي",
                            icon: "fa-eye"
                        }, {
                            id: "slideIn",
                            name: "انزلاق",
                            icon: "fa-arrows-left-right"
                        }, {
                            id: "bounceIn",
                            name: "ارتداد",
                            icon: "fa-basketball"
                        }, {
                            id: "zoomIn",
                            name: "تكبير",
                            icon: "fa-magnifying-glass-plus"
                        }, {
                            id: "flipIn",
                            name: "انقلاب",
                            icon: "fa-rotate"
                        }, {
                            id: "none",
                            name: "بدون",
                            icon: "fa-ban"
                        }],
                        selectedFont: this.storage?.messageFont || "default",
                        arabicFonts: [{
                            id: "default",
                            name: "افتراضي",
                            sample: "مرحبا بك"
                        }, {
                            id: "cairo",
                            name: "Cairo",
                            sample: "مرحبا بك"
                        }, {
                            id: "amiri",
                            name: "Amiri",
                            sample: "مرحبا بك"
                        }, {
                            id: "almarai",
                            name: "Almarai",
                            sample: "مرحبا بك"
                        }, {
                            id: "tajawal",
                            name: "Tajawal",
                            sample: "مرحبا بك"
                        }, {
                            id: "harmattan",
                            name: "Harmattan",
                            sample: "مرحبا بك"
                        }, {
                            id: "lateef",
                            name: "Lateef",
                            sample: "مرحبا بك"
                        }, {
                            id: "scheherazade",
                            name: "Scheherazade",
                            sample: "مرحبا بك"
                        }, {
                            id: "noto",
                            name: "Noto Naskh",
                            sample: "مرحبا بك"
                        }, {
                            id: "aref",
                            name: "Aref Ruqaa",
                            sample: "مرحبا بك"
                        }, {
                            id: "reem",
                            name: "Reem Kufi",
                            sample: "مرحبا بك"
                        }],
                        nameAnimation: this.storage?.nameAnimation || "none",
                        nameAnimations: [{
                            id: "none",
                            name: "بدون",
                            icon: "fa-ban"
                        }, {
                            id: "shimmer",
                            name: "لمعان",
                            icon: "fa-star"
                        }, {
                            id: "pulse",
                            name: "نبض",
                            icon: "fa-heart"
                        }, {
                            id: "glow",
                            name: "توهج",
                            icon: "fa-sun"
                        }, {
                            id: "rainbow",
                            name: "ألوان متدرجة",
                            icon: "fa-rainbow"
                        }, {
                            id: "wave",
                            name: "موجة",
                            icon: "fa-water"
                        }, {
                            id: "sparkle",
                            name: "بريق",
                            icon: "fa-sparkles"
                        }, {
                            id: "flip",
                            name: "انقلاب",
                            icon: "fa-sync"
                        }, {
                            id: "gradient",
                            name: "تدرج",
                            icon: "fa-palette"
                        }, {
                            id: "electric",
                            name: "كهربائي",
                            icon: "fa-bolt"
                        }],
                        defaultMessageAnimation: this.storage?.defaultMessageAnimation || "fadeIn",
                        animationKey: 0
                    }
                },
                watch: {
                    messageContext(e) {
                        e ? (this.activeTab = "general", e.gId && this.fetchReactionDetails(e.gId)) : this.activeTab = "quick", e && this.permissions.Mute && this.checkUserMuteStatus()
                    },
                    show(e) {
                        e && (this.messageContext ? this.activeTab = this.hasReactions || this.reactionLoading ? "reactions" : "general" : this.activeTab = "quick", this.messageContext && this.permissions.Mute && this.checkUserMuteStatus(), e && this.permissions.Mute && this.fetchMutedUsers())
                    },
                    activeTab(e) {
                        "muted" === e && this.permissions.Mute && this.fetchMutedUsers()
                    }
                },
                computed: {
                    muteDurations: () => [{
                        value: 5,
                        label: "5 دقائق"
                    }, {
                        value: 10,
                        label: "10 دقائق"
                    }, {
                        value: 30,
                        label: "30 دقيقة"
                    }, {
                        value: 60,
                        label: "ساعة واحدة"
                    }, {
                        value: 360,
                        label: "6 ساعات"
                    }, {
                        value: 1440,
                        label: "يوم كامل"
                    }],
                    isOwnMessage() {
                        if (!this.messageContext || !this.userId) return !1;
                        let e = null;
                        if (this.messageContext.gId) {
                            let t = this.messageContext.gId.split("_");
                            t.length >= 2 && (e = t[1])
                        }
                        if (!e && this.messageContext.user_id && (e = this.messageContext.user_id), !e && this.messageContext.args && Array.isArray(this.messageContext.args)) {
                            let a = this.messageContext.args[3];
                            a && (e = a)
                        }
                        return e && String(e) === String(this.userId)
                    },
                    isPinnedMessage() {
                        return this.messageContext?.isPinned || !1
                    },
                    themes: () => [{
                        id: "",
                        name: "كلاسيك",
                        icon: "fa-message",
                        description: "التصميم الأساسي"
                    }, {
                        id: "theme-rounded",
                        name: "ناعم",
                        icon: "fa-circle",
                        description: "حواف دائرية"
                    }, {
                        id: "theme-rect",
                        name: "حاد",
                        icon: "fa-square",
                        description: "زوايا حادة"
                    }, {
                        id: "theme-cover",
                        name: "عريض",
                        icon: "fa-expand",
                        description: "عرض كامل"
                    }],
                    hasCustomColor() {
                        return this.storage?.customMessageColor && null !== this.storage.customMessageColor
                    },
                    hasReactions() {
                        if (!this.reactionDetails || "object" != typeof this.reactionDetails) return !1;
                        for (let e in this.reactionDetails)
                            if (this.reactionDetails[e] && this.reactionDetails[e].length > 0) return !0;
                        return !1
                    },
                    reactionCount() {
                        return this.reactionDetails && "object" == typeof this.reactionDetails ? Object.keys(this.reactionDetails).filter(e => this.reactionDetails[e] && this.reactionDetails[e].length > 0).length : 0
                    },
                    hasReachedReactionLimit() {
                        return this.reactionCount >= 4
                    },
                    canAddReaction() {
                        return !this.hasReachedReactionLimit
                    }
                },
                mounted() {
                    this.restartAnimationLoop(), this.messageContext && this.permissions.Mute && this.checkUserMuteStatus()
                },
                beforeUnmount() {
                    this.animationLoopInterval && clearInterval(this.animationLoopInterval)
                },
                methods: {
                    getAppleEmojiUrl(e) {
                        if (window.sharedEmojiData && window.sharedEmojiData.getAppleEmojiUrl) return window.sharedEmojiData.getAppleEmojiUrl(e);
                        let t = [];
                        for (let a = 0; a < e.length; a++) {
                            let s = e.codePointAt(a);
                            s > 65535 && a++, t.push(s.toString(16).padStart(4, "0"))
                        }
                        return `https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/${t.join("-")}.png`
                    },
                    filterNumberInput(e) {
                        let t = String.fromCharCode(e.which);
                        return /^[-0-9]$/.test(t) ? "-" === t && (e.target.value.length > 0 || e.target.selectionStart > 0) || "-" === t && e.target.value.includes("-") ? (e.preventDefault(), !1) : void 0 : (e.preventDefault(), !1)
                    },
                    handlePaste(e) {
                        e.preventDefault();
                        let t = (e.clipboardData || window.clipboardData).getData("text");
                        /^-?\d+$/.test(t) && (this.manualMuteUserId = t)
                    },
                    getCustomEmojiUrl(e) {
                        try {
                            if (!e?.startsWith(":") || !e?.endsWith(":")) return null;
                            let t = parseInt(e.slice(1, -1));
                            if (isNaN(t)) return null;
                            let a = this.chat?.Settings?.Filter?.Emojis?.[t];
                            return a ? a.startsWith("http") || a.startsWith("//") ? a : `../../emojis/${a}` : null
                        } catch (s) {
                            return null
                        }
                    },
                    fetchMutedUsers() {
                        fetch("https://Easy-Chat-Max/getMutedUsers", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({})
                        }).then(e => e.json()).then(e => {
                            this.mutedUsersList = e.mutedUsers || []
                        }).catch(() => {
                            this.mutedUsersList = []
                        })
                    },
                    unmuteSingleUser(e) {
                        fetch("https://Easy-Chat-Max/unmuteSender", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({
                                senderId: e
                            })
                        }).then(() => {
                            this.mutedUsersList = this.mutedUsersList.filter(t => t.id !== e), setTimeout(() => {
                                this.fetchMutedUsers()
                            }, 500)
                        }).catch(e => {
                            console.error("Failed to unmute user:", e), this.fetchMutedUsers()
                        })
                    },
                    manualMuteUser() {
                        if (!this.manualMuteUserId || this.isManualMuting) return;
                        let e = parseInt(this.manualMuteUserId);
                        isNaN(e) || e <= 0 ? this.showMuteError("معرف المستخدم غير صحيح") : (this.isManualMuting = !0, this.muteError = "", this.muteSuccess = "", fetch("https://Easy-Chat-Max/manualMuteUser", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({
                                targetUserId: e,
                                duration: this.manualMuteDuration
                            })
                        }).then(e => e.json()).then(e => {
                            if (e.success) {
                                if (this.muteSuccess = e.message, e.targetInfo) {
                                    let t = e.targetInfo.isOnline ? "\uD83D\uDFE2" : "\uD83D\uDD34";
                                    this.muteSuccess = `${t} ${e.message}`
                                }
                                this.manualMuteUserId = "", setTimeout(() => {
                                    this.fetchMutedUsers(), this.muteSuccess = ""
                                }, 2e3)
                            } else this.showMuteError(e.message || "فشل في كتم المستخدم")
                        }).catch(e => {
                            console.error("Failed to mute user:", e), this.showMuteError("حدث خطأ أثناء محاولة الكتم")
                        }).finally(() => {
                            this.isManualMuting = !1
                        }))
                    },
                    showMuteError(e) {
                        this.muteError = e, setTimeout(() => {
                            this.muteError = ""
                        }, 3e3)
                    },
                    formatRemainingTime(e) {
                        if (!e || e <= 0) return "منتهي";
                        if (e < 60) return `${Math.floor(e)} دقيقة`;
                        if (e < 1440) {
                            let t = Math.floor(e / 60);
                            return `${t} ${1===t?"ساعة":"ساعات"}`
                        } {
                            let a = Math.floor(e / 1440);
                            return `${a} ${1===a?"يوم":"أيام"}`
                        }
                    },
                    checkUserMuteStatus() {
                        if (this.messageContext?.gId) {
                            let e = this.messageContext.gId.split("_");
                            if (e.length >= 2) {
                                let t = e[1];
                                fetch("https://Easy-Chat-Max/checkMuteStatus", {
                                    method: "POST",
                                    headers: {
                                        "Content-Type": "application/json"
                                    },
                                    body: JSON.stringify({
                                        userId: t
                                    })
                                }).then(e => e.json()).then(e => {
                                    this.isUserMuted = e.isMuted || !1
                                }).catch(() => {
                                    this.isUserMuted = !1
                                })
                            }
                        }
                    },
                    muteUser() {
                        if (!this.messageContext?.gId) return;
                        let e = this.messageContext.gId.split("_");
                        if (e.length >= 2) {
                            let t = e[1];
                            this.$emit("message-action", "mute-with-duration", {
                                ...this.messageContext,
                                userId: t,
                                duration: this.selectedMuteDuration
                            }), this.isUserMuted = !0
                        }
                    },
                    unmuteUser() {
                        if (!this.messageContext?.gId) return;
                        let e = this.messageContext.gId.split("_");
                        if (e.length >= 2) {
                            let t = e[1];
                            fetch("https://Easy-Chat-Max/unmuteSender", {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json"
                                },
                                body: JSON.stringify({
                                    senderId: t
                                })
                            }).then(() => {
                                this.isUserMuted = !1, "muted" === this.activeTab && this.fetchMutedUsers()
                            }).catch(e => {
                                console.error("Failed to unmute user:", e)
                            })
                        }
                    },
                    getMuteDurationText() {
                        let e = this.selectedMuteDuration;
                        if (e < 60) return `لمدة ${e} ${1===e?"دقيقة":"دقائق"}`;
                        {
                            let t = Math.floor(e / 60);
                            return `لمدة ${t} ${1===t?"ساعة":"ساعات"}`
                        }
                    },
                    getMessageAuthor() {
                        if (!this.messageContext) return "غير معروف";
                        if (this.messageContext.author) return this.messageContext.author;
                        if (this.messageContext.args && this.messageContext.args[0]) return this.messageContext.args[0];
                        if (this.messageContext.name) return this.messageContext.name;
                        if (this.messageContext.gId) {
                            let e = this.messageContext.gId.split("_");
                            if (e.length >= 4) return e[3]
                        }
                        return "غير معروف"
                    },
                    selectTab(e) {
                        "reactions" !== e || this.hasReactions || this.reactionLoading ? (this.activeTab = e, "appearance" === e && this.restartAnimationLoop(), "reactions" === e && this.messageContext?.gId && this.fetchReactionDetails(this.messageContext.gId)) : this.activeTab = "general"
                    },
                    selectTheme(e) {
                        this.$emit("theme-change", e)
                    },
                    toggleOption(e) {
                        this.$emit("toggle-option", e)
                    },
                    executeAction(e) {
                        this.$emit("execute-action", e)
                    },
                    executeMessageAction(e) {
                        this.$emit("message-action", e, this.messageContext)
                    },
                    applyNameColor() {
                        this.permissions.VIP.Message.Color && (this.selectedNameColor && (this.cosmeticsEnabled = !1, this.$emit("toggle-cosmetics", !1)), this.$emit("update-name-color", this.selectedNameColor))
                    },
                    resetNameColor() {
                        this.permissions.VIP.Message.Color && (this.selectedNameColor = "#ffffff", this.$emit("update-name-color", null))
                    },
                    toggleCosmetics() {
                        this.permissions.VIP.Cosmetics && (!this.cosmeticsEnabled && this.hasCustomColor && this.resetNameColor(), this.cosmeticsEnabled = !this.cosmeticsEnabled, this.$emit("toggle-cosmetics", this.cosmeticsEnabled))
                    },
                    selectAnimation(e) {
                        this.permissions.VIP.Message.Entrance && (this.sendAnimation = e, this.$emit("update-setting", "sendAnimation", e))
                    },
                    selectFont(e) {
                        this.permissions.VIP.Message.Font && (this.selectedFont = e, this.$emit("update-setting", "messageFont", e))
                    },
                    selectNameAnimation(e) {
                        this.permissions.VIP.Message.NameAnim && (this.nameAnimation = e, this.$emit("update-setting", "nameAnimation", e))
                    },
                    selectDefaultMessageAnimation(e) {
                        this.defaultMessageAnimation = e, this.animationKey++, this.$emit("update-setting", "defaultMessageAnimation", e), this.restartAnimationLoop()
                    },
                    restartAnimationLoop() {
                        this.animationLoopInterval && clearInterval(this.animationLoopInterval), "none" !== this.defaultMessageAnimation && (this.animationLoopInterval = setInterval(() => {
                            this.animationKey++
                        }, 3e3))
                    },
                    rgbToHex(e) {
                        if (!e) return "#ffffff";
                        let t = e.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
                        return t ? "#" + (16777216 + (parseInt(t[1]) << 16) + (parseInt(t[2]) << 8) + parseInt(t[3])).toString(16).slice(1) : "#ffffff"
                    },
                    fetchReactionDetails(e) {
                        e && (this.reactionLoading = !0, this.reactionError = null, this.reactionDetails = {}, this.activeReactionTab = null, fetch("https://Easy-Chat-Max/getReactionDetails", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({
                                messageId: e || this.messageContext?.gId
                            })
                        }).then(e => {
                            if (!e.ok) throw Error(`HTTP error! status: ${e.status}`);
                            return e.json()
                        }).then(e => {
                            "ok" === e ? setTimeout(() => {
                                this.reactionLoading && (this.reactionError = "انتهى وقت استجابة الخادم", this.reactionLoading = !1)
                            }, 5e3) : (this.reactionError = "Failed to fetch reaction details", this.reactionLoading = !1)
                        }).catch(e => {
                            console.error("[OptionsPanel] Error fetching reaction details:", e), this.reactionError = "Unable to connect to server", this.reactionLoading = !1
                        }))
                    },
                    handleReactionDetails(e) {
                        if (e.messageId === this.messageContext?.gId) {
                            this.reactionDetails = e.reactions || {}, this.reactionLoading = !1;
                            let t = this.getReactionTabs();
                            !this.activeReactionTab && t.length > 0 && (this.activeReactionTab = t[0])
                        }
                    },
                    getReactionTabs() {
                        return Object.keys(this.reactionDetails || {}).filter(e => this.reactionDetails[e] && this.reactionDetails[e].length > 0)
                    },
                    getCurrentReactionUsers() {
                        return this.activeReactionTab && this.reactionDetails[this.activeReactionTab] ? this.reactionDetails[this.activeReactionTab] : []
                    },
                    setActiveReactionTab(e) {
                        this.activeReactionTab = e
                    },
                    removeUserReaction(e, t) {
                        this.messageContext?.gId && t && fetch("https://Easy-Chat-Max/removeUserReaction", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({
                                messageId: this.messageContext.gId,
                                userId: e,
                                reaction: t
                            })
                        }).then(() => {
                            this.reactionDetails[t] && (this.reactionDetails[t] = this.reactionDetails[t].filter(t => t.id !== String(e)), 0 === this.reactionDetails[t].length && (delete this.reactionDetails[t], this.activeReactionTab = null))
                        }).catch(e => {
                            console.error("Failed to remove reaction:", e)
                        })
                    },
                    removeAllReactions(e) {
                        this.messageContext?.gId && e && fetch("https://Easy-Chat-Max/removeAllReactions", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({
                                messageId: this.messageContext.gId,
                                reaction: e
                            })
                        }).then(() => {
                            delete this.reactionDetails[e], this.activeReactionTab === e && (this.activeReactionTab = null)
                        }).catch(e => {
                            console.error("Failed to remove all reactions:", e)
                        })
                    }
                },
                render: function(e, t) {
                    return _openBlock(), _createElementBlock("div", {
                        class: "options-panel-container"
                    }, [_createElementVNode("div", {
                        class: "options-panel glass-panel"
                    }, [_createCommentVNode(" Panel Header "), _createElementVNode("div", {
                        class: _normalizeClass(["panel-header", {
                            "with-message": e.messageContext
                        }])
                    }, [_createCommentVNode(" Left Side: Tabs and Close Button "), _createElementVNode("div", {
                        class: "panel-header-left"
                    }, [_createCommentVNode(" Close button for message context "), e.messageContext ? (_openBlock(), _createElementBlock("button", {
                        key: 0,
                        class: "panel-close",
                        onClick: t => e.$emit("close"),
                        "data-tooltip": "إغلاق"
                    }, [_createElementVNode("i", {
                        class: "fa-solid fa-xmark"
                    })], 8, ["onClick"])) : _createCommentVNode("v-if", !0), _createCommentVNode(" Tabs "), _createElementVNode("div", {
                        class: "panel-tabs"
                    }, [_createCommentVNode(" Message Context Tabs "), e.messageContext ? (_openBlock(), _createElementBlock("button", {
                        key: 0,
                        class: _normalizeClass(["panel-tab message-tab", {
                            active: "general" === e.activeTab
                        }]),
                        onClick: t => e.selectTab("general")
                    }, [_createElementVNode("div", {
                        class: "tab-icon"
                    }, [_createElementVNode("i", {
                        class: "fa-solid fa-message"
                    })]), _createElementVNode("span", {
                        class: "tab-label"
                    }, "عام"), _createElementVNode("div", {
                        class: "tab-indicator"
                    })], 10, ["onClick"])) : _createCommentVNode("v-if", !0), e.messageContext && (e.hasReactions || e.reactionLoading) ? (_openBlock(), _createElementBlock("button", {
                        key: 1,
                        class: _normalizeClass(["panel-tab message-tab", {
                            active: "reactions" === e.activeTab
                        }]),
                        onClick: t => e.selectTab("reactions")
                    }, [_createElementVNode("div", {
                        class: "tab-icon"
                    }, [_createElementVNode("i", {
                        class: "fa-solid fa-heart"
                    })]), _createElementVNode("span", {
                        class: "tab-label"
                    }, "التفاعلات"), _createElementVNode("div", {
                        class: "tab-indicator"
                    })], 10, ["onClick"])) : _createCommentVNode("v-if", !0), e.messageContext && e.permissions.IsAdmin ? (_openBlock(), _createElementBlock("button", {
                        key: 2,
                        class: _normalizeClass(["panel-tab message-tab", {
                            active: "admin" === e.activeTab
                        }]),
                        onClick: t => e.selectTab("admin")
                    }, [_createElementVNode("div", {
                        class: "tab-icon"
                    }, [_createElementVNode("i", {
                        class: "fa-solid fa-shield-halved"
                    })]), _createElementVNode("span", {
                        class: "tab-label"
                    }, "إدارة"), _createElementVNode("div", {
                        class: "tab-indicator"
                    })], 10, ["onClick"])) : _createCommentVNode("v-if", !0), _createCommentVNode(" Regular Tabs (only show when not in message context) "), e.messageContext ? _createCommentVNode("v-if", !0) : (_openBlock(), _createElementBlock("button", {
                        key: 3,
                        class: _normalizeClass(["panel-tab", {
                            active: "quick" === e.activeTab
                        }]),
                        onClick: t => e.selectTab("quick"),
                        "data-tooltip": "اختصارات وأدوات"
                    }, [_createElementVNode("div", {
                        class: "tab-icon"
                    }, [_createElementVNode("i", {
                        class: "fa-solid fa-wand-magic-sparkles"
                    })]), _createElementVNode("div", {
                        class: "tab-indicator"
                    })], 10, ["onClick"])), e.messageContext ? _createCommentVNode("v-if", !0) : (_openBlock(), _createElementBlock("button", {
                        key: 4,
                        class: _normalizeClass(["panel-tab", {
                            active: "appearance" === e.activeTab
                        }]),
                        onClick: t => e.selectTab("appearance"),
                        "data-tooltip": "السمات والألوان"
                    }, [_createElementVNode("div", {
                        class: "tab-icon"
                    }, [_createElementVNode("i", {
                        class: "fa-solid fa-paint-roller"
                    })]), _createElementVNode("div", {
                        class: "tab-indicator"
                    })], 10, ["onClick"])), e.messageContext ? _createCommentVNode("v-if", !0) : (_openBlock(), _createElementBlock("button", {
                        key: 5,
                        class: _normalizeClass(["panel-tab", {
                            active: "settings" === e.activeTab
                        }]),
                        onClick: t => e.selectTab("settings"),
                        "data-tooltip": "التفضيلات"
                    }, [_createElementVNode("div", {
                        class: "tab-icon"
                    }, [_createElementVNode("i", {
                        class: "fa-solid fa-sliders"
                    })]), _createElementVNode("div", {
                        class: "tab-indicator"
                    })], 10, ["onClick"])), e.messageContext ? _createCommentVNode("v-if", !0) : (_openBlock(), _createElementBlock("button", {
                        key: 6,
                        class: _normalizeClass(["panel-tab", {
                            active: "profile" === e.activeTab,
                            "vip-tab": e.permissions.VIP.Message.Color || e.permissions.VIP.Message.Entrance || e.permissions.VIP.Message.Font || e.permissions.VIP.Message.NameAnim || e.permissions.VIP.Cosmetics
                        }]),
                        onClick: t => e.selectTab("profile"),
                        "data-tooltip": "الملف الشخصي"
                    }, [_createElementVNode("div", {
                        class: "tab-icon"
                    }, [_createElementVNode("i", {
                        class: "fa-solid fa-user-pen"
                    }), e.permissions.VIP.Message.Color || e.permissions.VIP.Message.Entrance || e.permissions.VIP.Message.Font || e.permissions.VIP.Message.NameAnim || e.permissions.VIP.Cosmetics ? (_openBlock(), _createElementBlock("i", {
                        key: 0,
                        class: "fa-solid fa-star vip-badge"
                    })) : _createCommentVNode("v-if", !0)]), _createElementVNode("div", {
                        class: "tab-indicator"
                    })], 10, ["onClick"])), !e.messageContext && e.hasAdminPermissions ? (_openBlock(), _createElementBlock("button", {
                        key: 7,
                        class: _normalizeClass(["panel-tab admin-tab", {
                            active: "admin" === e.activeTab
                        }]),
                        onClick: t => e.selectTab("admin"),
                        "data-tooltip": "أدوات الإدارة"
                    }, [_createElementVNode("div", {
                        class: "tab-icon"
                    }, [_createElementVNode("i", {
                        class: "fa-solid fa-crown"
                    })]), _createElementVNode("div", {
                        class: "tab-indicator"
                    })], 10, ["onClick"])) : _createCommentVNode("v-if", !0), !e.messageContext && e.permissions.Mute ? (_openBlock(), _createElementBlock("button", {
                        key: 8,
                        class: _normalizeClass(["panel-tab muted-tab", {
                            active: "muted" === e.activeTab
                        }]),
                        onClick: t => e.selectTab("muted"),
                        "data-tooltip": "المكتومين"
                    }, [_createElementVNode("div", {
                        class: "tab-icon"
                    }, [_createElementVNode("i", {
                        class: "fa-solid fa-volume-xmark"
                    })]), _createElementVNode("div", {
                        class: "tab-indicator"
                    })], 10, ["onClick"])) : _createCommentVNode("v-if", !0), e.messageContext ? _createCommentVNode("v-if", !0) : (_openBlock(), _createElementBlock("button", {
                        key: 9,
                        class: "panel-close",
                        onClick: t => e.$emit("close"),
                        "data-tooltip": "إغلاق"
                    }, [_createElementVNode("i", {
                        class: "fa-solid fa-xmark"
                    })], 8, ["onClick"]))])])], 2), _createCommentVNode(" Panel Content "), _createElementVNode("div", {
                        class: "panel-content"
                    }, [_createCommentVNode(" Message Options - General Tab "), e.messageContext && "general" === e.activeTab ? (_openBlock(), _createElementBlock("div", {
                        key: 0,
                        class: "tab-content quick-actions"
                    }, [_createElementVNode("div", {
                        class: "section-header"
                    }, [_createElementVNode("i", {
                        class: "fa-solid fa-message"
                    }), _createElementVNode("h3", null, "خيارات عامة")]), _createElementVNode("div", {
                        class: "actions-grid message-options-grid"
                    }, [_createCommentVNode(" Reply "), _createElementVNode("button", {
                        class: "action-card",
                        onClick: t => e.executeMessageAction("reply"),
                        style: {
                            "--action-color": "#3b82f6"
                        }
                    }, [_createElementVNode("div", {
                        class: "action-icon",
                        style: {
                            background: "rgba(59, 130, 246, 0.15)",
                            color: "#3b82f6"
                        }
                    }, [_createElementVNode("i", {
                        class: "fa-solid fa-reply"
                    })]), _createElementVNode("div", {
                        class: "action-info"
                    }, [_createElementVNode("div", {
                        class: "action-label"
                    }, "رد"), _createElementVNode("div", {
                        class: "action-description"
                    }, "الرد على الرسالة")])], 8, ["onClick"]), _createCommentVNode(" React "), _createElementVNode("button", {
                        class: _normalizeClass(["action-card", {
                            disabled: e.hasReachedReactionLimit
                        }]),
                        onClick: t => e.canAddReaction && e.executeMessageAction("react"),
                        disabled: e.hasReachedReactionLimit,
                        style: {
                            "--action-color": "#f59e0b"
                        },
                        title: e.hasReachedReactionLimit ? "تم الوصول للحد الأقصى (4 تفاعلات)" : ""
                    }, [_createElementVNode("div", {
                        class: "action-icon",
                        style: {
                            background: "rgba(245, 158, 11, 0.15)",
                            color: "#f59e0b"
                        }
                    }, [_createElementVNode("i", {
                        class: "fa-solid fa-face-smile"
                    })]), _createElementVNode("div", {
                        class: "action-info"
                    }, [_createElementVNode("div", {
                        class: "action-label"
                    }, "تفاعل"), _createElementVNode("div", {
                        class: "action-description"
                    }, _toDisplayString(e.hasReachedReactionLimit ? "الحد الأقصى" : "إضافة تفاعل"), 1)])], 10, ["onClick", "disabled", "title"]), _createCommentVNode(" Copy "), _createElementVNode("button", {
                        class: "action-card",
                        onClick: t => e.executeMessageAction("copy"),
                        style: {
                            "--action-color": "#10b981"
                        }
                    }, [_createElementVNode("div", {
                        class: "action-icon",
                        style: {
                            background: "rgba(16, 185, 129, 0.15)",
                            color: "#10b981"
                        }
                    }, [_createElementVNode("i", {
                        class: "fa-solid fa-copy"
                    })]), _createElementVNode("div", {
                        class: "action-info"
                    }, [_createElementVNode("div", {
                        class: "action-label"
                    }, "نسخ"), _createElementVNode("div", {
                        class: "action-description"
                    }, "نسخ محتوى الرسالة")])], 8, ["onClick"]), _createCommentVNode(" Edit (own messages) "), e.isOwnMessage ? (_openBlock(), _createElementBlock("button", {
                        key: 0,
                        class: "action-card",
                        onClick: t => e.executeMessageAction("edit"),
                        style: {
                            "--action-color": "#8b5cf6"
                        }
                    }, [_createElementVNode("div", {
                        class: "action-icon",
                        style: {
                            background: "rgba(139, 92, 246, 0.15)",
                            color: "#8b5cf6"
                        }
                    }, [_createElementVNode("i", {
                        class: "fa-solid fa-pen"
                    })]), _createElementVNode("div", {
                        class: "action-info"
                    }, [_createElementVNode("div", {
                        class: "action-label"
                    }, "تعديل"), _createElementVNode("div", {
                        class: "action-description"
                    }, "تعديل رسالتي")])], 8, ["onClick"])) : _createCommentVNode("v-if", !0), _createCommentVNode(" Delete (own messages) "), e.isOwnMessage ? (_openBlock(), _createElementBlock("button", {
                        key: 1,
                        class: "action-card",
                        onClick: t => e.executeMessageAction("delete-own"),
                        style: {
                            "--action-color": "#ef4444"
                        }
                    }, [_createElementVNode("div", {
                        class: "action-icon",
                        style: {
                            background: "rgba(239, 68, 68, 0.15)",
                            color: "#ef4444"
                        }
                    }, [_createElementVNode("i", {
                        class: "fa-solid fa-trash"
                    })]), _createElementVNode("div", {
                        class: "action-info"
                    }, [_createElementVNode("div", {
                        class: "action-label"
                    }, "حذف"), _createElementVNode("div", {
                        class: "action-description"
                    }, "حذف رسالتي")])], 8, ["onClick"])) : _createCommentVNode("v-if", !0)])])) : _createCommentVNode("v-if", !0), _createCommentVNode(" Message Options - Reactions Tab "), e.messageContext && "reactions" === e.activeTab ? (_openBlock(), _createElementBlock("div", {
                        key: 1,
                        class: "tab-content reactions-compact"
                    }, [_createCommentVNode(" Standard Section Header "), _createElementVNode("div", {
                        class: "section-header"
                    }, [_createElementVNode("i", {
                        class: "fa-solid fa-heart"
                    }), _createElementVNode("h3", null, "التفاعلات"), e.reactionCount > 0 ? (_openBlock(), _createElementBlock("span", {
                        key: 0,
                        class: _normalizeClass(["reaction-limit-indicator", {
                            "limit-reached": e.hasReachedReactionLimit
                        }])
                    }, _toDisplayString(e.reactionCount) + "/4 ", 3)) : _createCommentVNode("v-if", !0)]), _createCommentVNode(" Loading State "), e.reactionLoading ? (_openBlock(), _createElementBlock("div", {
                        key: 0,
                        class: "reactions-loading-compact"
                    }, [_createElementVNode("i", {
                        class: "fas fa-spinner fa-spin"
                    }), _createElementVNode("span", null, "جاري التحميل...")])) : e.getReactionTabs().length > 0 ? (_openBlock(), _createElementBlock(_Fragment, {
                        key: 1
                    }, [_createCommentVNode(" Main Content "), _createElementVNode("div", {
                        class: "reactions-content-compact"
                    }, [_createCommentVNode(" Emoji Filter Pills "), _createElementVNode("div", {
                        class: "emoji-filters-compact"
                    }, [_createCommentVNode(" Individual Emojis "), (_openBlock(!0), _createElementBlock(_Fragment, null, _renderList(e.getReactionTabs(), t => (_openBlock(), _createElementBlock("button", {
                        key: t,
                        onClick: _withModifiers(a => e.setActiveReactionTab(t), ["stop"]),
                        class: _normalizeClass(["filter-btn", {
                            active: e.activeReactionTab === t
                        }])
                    }, [t.startsWith(":") && t.endsWith(":") ? (_openBlock(), _createElementBlock("span", {
                        key: 0,
                        class: "btn-emoji"
                    }, [_createElementVNode("img", {
                        src: e.getCustomEmojiUrl(t),
                        class: "custom-emoji-img",
                        onError: e => e.target.style.display = "none"
                    }, null, 40, ["src", "onError"])])) : (_openBlock(), _createElementBlock("span", {
                        key: 1,
                        class: "btn-emoji"
                    }, [_createElementVNode("img", {
                        src: e.getAppleEmojiUrl(t),
                        class: "apple-emoji-img",
                        alt: t,
                        onError(e) {
                            e.target.style.display = "none", e.target.parentElement.innerHTML = t
                        }
                    }, null, 40, ["src", "alt", "onError"])])), _createElementVNode("span", {
                        class: "btn-count"
                    }, _toDisplayString(e.reactionDetails[t].length), 1), _createCommentVNode(" Admin Remove All Button "), e.permissions?.RemoveAllReactions ? (_openBlock(), _createElementBlock("button", {
                        key: 2,
                        onClick: _withModifiers(a => e.removeAllReactions(t), ["stop"]),
                        class: "remove-all-btn",
                        title: "حذف جميع التفاعلات"
                    }, [_createElementVNode("i", {
                        class: "fas fa-times"
                    })], 8, ["onClick"])) : _createCommentVNode("v-if", !0)], 10, ["onClick"]))), 128))]), _createCommentVNode(" Users List "), _createElementVNode("div", {
                        class: "users-list-compact"
                    }, [e.activeReactionTab ? (_openBlock(!0), _createElementBlock(_Fragment, {
                        key: 1
                    }, _renderList(e.getCurrentReactionUsers(), t => (_openBlock(), _createElementBlock("div", {
                        key: t.id,
                        class: "user-row"
                    }, [t.avatar ? (_openBlock(), _createElementBlock("img", {
                        key: 0,
                        src: t.avatar,
                        class: "user-avatar-img",
                        onError(e) {
                            e.target.style.display = "none", e.target.nextElementSibling.style.display = "flex"
                        }
                    }, null, 40, ["src", "onError"])) : _createCommentVNode("v-if", !0), _createElementVNode("div", {
                        class: "user-avatar-compact",
                        style: {
                            display: "none"
                        }
                    }, _toDisplayString(t.name.charAt(0).toUpperCase()), 1), _createElementVNode("div", {
                        class: "user-info-compact"
                    }, [_createElementVNode("span", {
                        class: "user-name"
                    }, _toDisplayString(t.name), 1), _createElementVNode("span", {
                        class: "user-id"
                    }, "ID: " + _toDisplayString(t.id), 1)]), e.permissions?.RemoveReaction ? (_openBlock(), _createElementBlock("button", {
                        key: 1,
                        class: "remove-btn-compact",
                        onClick: _withModifiers(a => e.removeUserReaction(t.id, e.activeReactionTab), ["stop"]),
                        title: "حذف التفاعل"
                    }, [_createElementVNode("i", {
                        class: "fas fa-trash"
                    })], 8, ["onClick"])) : _createCommentVNode("v-if", !0)]))), 128)) : (_openBlock(), _createElementBlock("div", {
                        key: 0,
                        class: "select-emoji-hint"
                    }, [_createElementVNode("i", {
                        class: "fas fa-hand-pointer"
                    }), _createElementVNode("span", null, "اختر تفاعل لعرض الأشخاص")]))])])], 2112)) : (_openBlock(), _createElementBlock(_Fragment, {
                        key: 2
                    }, [_createCommentVNode(" Empty State "), _createElementVNode("div", {
                        class: "reactions-empty-compact"
                    }, [_createElementVNode("i", {
                        class: "far fa-face-smile"
                    }), _createElementVNode("span", null, "لا توجد تفاعلات"), _createElementVNode("button", {
                        onClick: t => e.canAddReaction && e.executeMessageAction("react"),
                        class: _normalizeClass(["add-reaction-btn", {
                            disabled: e.hasReachedReactionLimit
                        }]),
                        disabled: e.hasReachedReactionLimit,
                        title: e.hasReachedReactionLimit ? "تم الوصول للحد الأقصى (4 تفاعلات)" : ""
                    }, [_createElementVNode("i", {
                        class: "fas fa-plus"
                    }), _createElementVNode("span", null, _toDisplayString(e.hasReachedReactionLimit ? "الحد الأقصى" : "إضافة تفاعل"), 1)], 10, ["onClick", "disabled", "title"])])], 2112))])) : _createCommentVNode("v-if", !0), _createCommentVNode(" Message Options - Admin Tab "), e.messageContext && "admin" === e.activeTab && e.permissions.IsAdmin ? (_openBlock(), _createElementBlock("div", {
                        key: 2,
                        class: "tab-content admin-controls-enhanced"
                    }, [_createCommentVNode(" Admin Header "), _createElementVNode("div", {
                        class: "section-header"
                    }, [_createElementVNode("i", {
                        class: "fa-solid fa-shield-halved"
                    }), _createElementVNode("span", null, "أدوات الإدارة")]), _createCommentVNode(" Message Actions Section "), e.permissions.IsAdmin ? (_openBlock(), _createElementBlock("div", {
                        key: 0,
                        class: "admin-actions-section"
                    }, [_createElementVNode("div", {
                        class: "section-subtitle"
                    }, [_createElementVNode("i", {
                        class: "fa-solid fa-message"
                    }), _createElementVNode("span", null, "إجراءات الرسالة")]), _createElementVNode("div", {
                        class: "admin-actions-grid"
                    }, [_createCommentVNode(" Delete Message "), e.permissions.Delete ? (_openBlock(), _createElementBlock("button", {
                        key: 0,
                        class: "admin-action-card delete-action",
                        onClick: t => e.executeMessageAction("admin-delete")
                    }, [_createElementVNode("div", {
                        class: "action-card-icon"
                    }, [_createElementVNode("i", {
                        class: "fa-solid fa-trash-can"
                    })]), _createElementVNode("div", {
                        class: "action-card-content"
                    }, [_createElementVNode("div", {
                        class: "action-card-title"
                    }, "حذف الرسالة"), _createElementVNode("div", {
                        class: "action-card-desc"
                    }, "إزالة نهائية")])], 8, ["onClick"])) : _createCommentVNode("v-if", !0), _createCommentVNode(" Pin/Unpin Message "), e.permissions.Pin ? (_openBlock(), _createElementBlock("button", {
                        key: 1,
                        class: _normalizeClass(["admin-action-card pin-action", {
                            pinned: e.isPinnedMessage
                        }]),
                        onClick: t => e.executeMessageAction("pin")
                    }, [_createElementVNode("div", {
                        class: "action-card-icon"
                    }, [_createElementVNode("i", {
                        class: _normalizeClass((e.isPinnedMessage, "fa-solid fa-thumbtack"))
                    }, null, 2)]), _createElementVNode("div", {
                        class: "action-card-content"
                    }, [_createElementVNode("div", {
                        class: "action-card-title"
                    }, _toDisplayString(e.isPinnedMessage ? "إلغاء التثبيت" : "تثبيت الرسالة"), 1), _createElementVNode("div", {
                        class: "action-card-desc"
                    }, _toDisplayString(e.isPinnedMessage ? "إزالة من لأسفل" : "عرض في الأسفل"), 1)])], 10, ["onClick"])) : _createCommentVNode("v-if", !0)])])) : _createCommentVNode("v-if", !0), _createCommentVNode(" User Moderation Section "), e.permissions.Mute && !e.isOwnMessage ? (_openBlock(), _createElementBlock("div", {
                        key: 1,
                        class: "admin-moderation-section"
                    }, [_createElementVNode("div", {
                        class: "section-subtitle"
                    }, [_createElementVNode("i", {
                        class: "fa-solid fa-user-shield"
                    }), _createElementVNode("span", null, "إدارة المستخدم")]), _createCommentVNode(" Mute Status Card "), e.isUserMuted ? (_openBlock(), _createElementBlock("div", {
                        key: 0,
                        class: "mute-status-card muted"
                    }, [_createElementVNode("div", {
                        class: "status-icon"
                    }, [_createElementVNode("i", {
                        class: "fa-solid fa-volume-xmark"
                    })]), _createElementVNode("div", {
                        class: "status-content"
                    }, [_createElementVNode("div", {
                        class: "status-title"
                    }, "المستخدم مكتوم حالياً"), _createElementVNode("div", {
                        class: "status-desc"
                    }, "لا يمكنه إرسال رسائل جديدة")]), _createElementVNode("button", {
                        class: "unmute-action-btn",
                        onClick: t => e.unmuteUser()
                    }, [_createElementVNode("i", {
                        class: "fa-solid fa-volume-high"
                    }), _createElementVNode("span", null, "إلغاء الكتم")], 8, ["onClick"])])) : (_openBlock(), _createElementBlock(_Fragment, {
                        key: 1
                    }, [_createCommentVNode(" Mute Controls "), _createElementVNode("div", {
                        class: "mute-control-card"
                    }, [_createElementVNode("div", {
                        class: "mute-header"
                    }, [_createElementVNode("i", {
                        class: "fa-solid fa-volume-xmark"
                    }), _createElementVNode("span", null, "كتم المستخدم")]), _createCommentVNode(" Duration Selector "), _createElementVNode("div", {
                        class: "duration-selector-enhanced"
                    }, [_createElementVNode("label", {
                        class: "duration-label-enhanced"
                    }, [_createElementVNode("i", {
                        class: "fa-regular fa-clock"
                    }), _createElementVNode("span", null, "اختر المدة:")]), _createElementVNode("div", {
                        class: "duration-options"
                    }, [(_openBlock(!0), _createElementBlock(_Fragment, null, _renderList(e.muteDurations, t => (_openBlock(), _createElementBlock("button", {
                        key: t.value,
                        class: _normalizeClass(["duration-option", {
                            selected: e.selectedMuteDuration === t.value
                        }]),
                        onClick: a => e.selectedMuteDuration = t.value
                    }, _toDisplayString(t.label), 11, ["onClick"]))), 128))])]), _createCommentVNode(" Mute Action Button "), _createElementVNode("button", {
                        class: "mute-action-btn",
                        onClick: t => e.muteUser()
                    }, [_createElementVNode("i", {
                        class: "fa-solid fa-ban"
                    }), _createElementVNode("span", null, "تطبيق الكتم"), _createElementVNode("span", {
                        class: "mute-duration-text"
                    }, _toDisplayString(e.getMuteDurationText()), 1)], 8, ["onClick"])])], 2112))])) : _createCommentVNode("v-if", !0)])) : _createCommentVNode("v-if", !0), _createCommentVNode(" Quick Actions Tab "), _withDirectives(_createElementVNode("div", {
                        class: "tab-content quick-actions"
                    }, [_createElementVNode("div", {
                        class: "section-header"
                    }, [_createElementVNode("i", {
                        class: "fa-solid fa-rocket"
                    }), _createElementVNode("h3", null, "الوصول السريع")]), _createElementVNode("div", {
                        class: "actions-grid"
                    }, [_createCommentVNode(" First row - two buttons side by side "), _createElementVNode("button", {
                        class: "action-card",
                        onClick: t => e.executeAction("search")
                    }, [_createElementVNode("div", {
                        class: "action-icon",
                        style: {
                            "--action-color": "#3b82f6"
                        }
                    }, [_createElementVNode("i", {
                        class: "fa-solid fa-magnifying-glass"
                    })]), _createElementVNode("div", {
                        class: "action-info"
                    }, [_createElementVNode("div", {
                        class: "action-label"
                    }, "البحث السريع"), _createElementVNode("div", {
                        class: "action-description"
                    }, "ابحث في المحادثة")]), _createElementVNode("div", {
                        class: "action-badge"
                    }, "Ctrl+F")], 8, ["onClick"]), _createElementVNode("button", {
                        class: "action-card",
                        onClick: t => e.executeAction("clear-my-chat")
                    }, [_createElementVNode("div", {
                        class: "action-icon clear-icon",
                        style: {
                            "--action-color": "#f59e0b"
                        }
                    }, [_createElementVNode("i", {
                        class: "fa-solid fa-eraser"
                    })]), _createElementVNode("div", {
                        class: "action-info"
                    }, [_createElementVNode("div", {
                        class: "action-label"
                    }, "مسح المحادثة"), _createElementVNode("div", {
                        class: "action-description"
                    }, "تنظيف الشاشة")])], 8, ["onClick"]), _createCommentVNode(" Second row - full width hide chat button "), _createElementVNode("button", {
                        class: "action-card action-card-full",
                        onClick: t => e.executeAction("hide-chat"),
                        style: {
                            "--action-color": "#ef4444"
                        }
                    }, [_createElementVNode("div", {
                        class: "action-icon hide-icon",
                        style: {
                            background: "rgba(239, 68, 68, 0.15)",
                            color: "#ef4444"
                        }
                    }, [_createElementVNode("i", {
                        class: "fa-solid fa-eye-slash"
                    })]), _createElementVNode("div", {
                        class: "action-info"
                    }, [_createElementVNode("div", {
                        class: "action-label"
                    }, "إخفاء الشات"), _createElementVNode("div", {
                        class: "action-description"
                    }, "إغلاق الشات مؤقتاً")])], 8, ["onClick"])])], 512), [
                        [_vShow, "quick" === e.activeTab]
                    ]), _createCommentVNode(" Appearance Tab "), _withDirectives(_createElementVNode("div", {
                        class: "tab-content appearance-settings"
                    }, [_createElementVNode("div", {
                        class: "section-header"
                    }, [_createElementVNode("i", {
                        class: "fa-solid fa-palette"
                    }), _createElementVNode("h3", null, "السمات والألوان")]), _createCommentVNode(" Default Message Animation Selector "), _createElementVNode("div", {
                        class: "animation-selector-section"
                    }, [_createElementVNode("div", {
                        class: "animation-selector-header"
                    }, [_createElementVNode("i", {
                        class: "fa-solid fa-wand-magic-sparkles"
                    }), _createElementVNode("span", null, "حركة دخول الرسائل")]), _withDirectives(_createElementVNode("select", {
                        "onUpdate:modelValue": t => e.defaultMessageAnimation = t,
                        onChange: t => e.selectDefaultMessageAnimation(e.defaultMessageAnimation),
                        class: "default-animation-dropdown"
                    }, [(_openBlock(!0), _createElementBlock(_Fragment, null, _renderList(e.animations, e => (_openBlock(), _createElementBlock("option", {
                        key: e.id,
                        value: e.id
                    }, _toDisplayString(e.name), 9, ["value"]))), 128))], 40, ["onUpdate:modelValue", "onChange"]), [
                        [_vModelSelect, e.defaultMessageAnimation]
                    ])]), _createElementVNode("div", {
                        class: "themes-grid"
                    }, [(_openBlock(!0), _createElementBlock(_Fragment, null, _renderList(e.themes, t => (_openBlock(), _createElementBlock("div", {
                        key: t.id,
                        class: _normalizeClass(["theme-card", {
                            active: e.currentTheme === t.id
                        }]),
                        onClick: a => e.selectTheme(t.id)
                    }, [_createElementVNode("div", {
                        class: "theme-preview"
                    }, [(_openBlock(), _createElementBlock("div", {
                        class: _normalizeClass(["preview-message", "message-item", t.id, "animate-" + e.defaultMessageAnimation]),
                        key: e.animationKey + "-" + t.id
                    }, [_createElementVNode("div", {
                        class: "preview-avatar"
                    }), _createElementVNode("div", {
                        class: "preview-content"
                    }, [_createElementVNode("div", {
                        class: "preview-author"
                    }, "مستخدم"), _createElementVNode("div", {
                        class: "preview-text"
                    }, "هذا مثال على الرسالة")])], 2))]), _createElementVNode("div", {
                        class: "theme-info"
                    }, [_createElementVNode("i", {
                        class: _normalizeClass(["fa-solid", t.icon])
                    }, null, 2), _createElementVNode("span", {
                        class: "theme-name"
                    }, _toDisplayString(t.name), 1)]), _createElementVNode("div", {
                        class: "theme-description"
                    }, _toDisplayString(t.description), 1), e.currentTheme === t.id ? (_openBlock(), _createElementBlock("div", {
                        key: 0,
                        class: "selected-badge"
                    }, [_createElementVNode("i", {
                        class: "fa-solid fa-check"
                    })])) : _createCommentVNode("v-if", !0)], 10, ["onClick"]))), 128))])], 512), [
                        [_vShow, "appearance" === e.activeTab]
                    ]), _createCommentVNode(" Settings Tab "), _withDirectives(_createElementVNode("div", {
                        class: "tab-content general-settings"
                    }, [_createCommentVNode(" Display & Appearance Section (Top) "), _createElementVNode("div", {
                        class: "section-header"
                    }, [_createElementVNode("i", {
                        class: "fa-solid fa-eye"
                    }), _createElementVNode("h3", null, "العرض والمظهر")]), _createElementVNode("div", {
                        class: "settings-grid"
                    }, [_createElementVNode("div", {
                        class: "setting-card",
                        onClick: t => e.toggleOption("hideAvatars")
                    }, [_createElementVNode("div", {
                        class: _normalizeClass(["setting-icon", {
                            active: !e.hideAvatars
                        }])
                    }, [_createElementVNode("i", {
                        class: _normalizeClass(e.hideAvatars ? "fa-solid fa-user-slash" : "fa-solid fa-user-circle")
                    }, null, 2)], 2), _createElementVNode("div", {
                        class: "setting-info"
                    }, [_createElementVNode("div", {
                        class: "setting-label"
                    }, "الصور الرمزية"), _createElementVNode("div", {
                        class: "setting-status"
                    }, [_createElementVNode("span", {
                        class: _normalizeClass(["status-dot", {
                            active: !e.hideAvatars
                        }])
                    }, null, 2), _createElementVNode("span", null, _toDisplayString(e.hideAvatars ? "مخفية" : "ظاهرة"), 1)])])], 8, ["onClick"]), _createElementVNode("div", {
                        class: "setting-card",
                        onClick: t => e.toggleOption("enableMessageGrouping")
                    }, [_createElementVNode("div", {
                        class: _normalizeClass(["setting-icon", {
                            active: e.enableGrouping
                        }])
                    }, [_createElementVNode("i", {
                        class: "fa-solid fa-layer-group"
                    })], 2), _createElementVNode("div", {
                        class: "setting-info"
                    }, [_createElementVNode("div", {
                        class: "setting-label"
                    }, "تجميع الرسائل"), _createElementVNode("div", {
                        class: "setting-status"
                    }, [_createElementVNode("span", {
                        class: _normalizeClass(["status-dot", {
                            active: e.enableGrouping
                        }])
                    }, null, 2), _createElementVNode("span", null, _toDisplayString(e.enableGrouping ? "مفعل" : "معطل"), 1)])])], 8, ["onClick"]), _createElementVNode("div", {
                        class: _normalizeClass(["setting-card", {
                            disabled: e.typingDisabledByServer
                        }]),
                        style: _normalizeStyle(e.typingDisabledByServer ? "opacity: 0.5; cursor: not-allowed; pointer-events: none;" : ""),
                        onClick: t => !e.typingDisabledByServer && e.toggleOption("showTypingIndicator"),
                        title: e.typingDisabledByServer ? "معطل من قبل السيرفر" : ""
                    }, [_createElementVNode("div", {
                        class: _normalizeClass(["setting-icon", {
                            active: e.showTypingIndicator && !e.typingDisabledByServer
                        }])
                    }, [_createElementVNode("i", {
                        class: "fa-solid fa-keyboard"
                    })], 2), _createElementVNode("div", {
                        class: "setting-info"
                    }, [_createElementVNode("div", {
                        class: "setting-label"
                    }, [_createTextVNode(" مؤشر الكتابة "), e.typingDisabledByServer ? (_openBlock(), _createElementBlock("span", {
                        key: 0,
                        style: {
                            color: "#ff4444",
                            "font-size": "0.8em",
                            "margin-right": "5px"
                        }
                    }, " (معطل من السيرفر) ")) : _createCommentVNode("v-if", !0)]), _createElementVNode("div", {
                        class: "setting-status"
                    }, [_createElementVNode("span", {
                        class: _normalizeClass(["status-dot", {
                            active: e.showTypingIndicator && !e.typingDisabledByServer
                        }])
                    }, null, 2), _createElementVNode("span", null, _toDisplayString(e.typingDisabledByServer ? "معطل من السيرفر" : e.showTypingIndicator ? "مفعل" : "معطل"), 1)])])], 14, ["onClick", "title"])]), _createCommentVNode(" Sound & Notifications Section (Bottom) "), _createElementVNode("div", {
                        class: "section-header",
                        style: {
                            "margin-top": "20px"
                        }
                    }, [_createElementVNode("i", {
                        class: "fa-solid fa-bell"
                    }), _createElementVNode("h3", null, "الصوت والإشعارات")]), _createElementVNode("div", {
                        class: "settings-grid"
                    }, [_createElementVNode("div", {
                        class: "setting-card",
                        onClick: t => e.toggleOption("muteSound")
                    }, [_createElementVNode("div", {
                        class: _normalizeClass(["setting-icon", {
                            active: !e.isMuted
                        }])
                    }, [_createElementVNode("i", {
                        class: _normalizeClass(e.isMuted ? "fa-solid fa-volume-xmark" : "fa-solid fa-volume-high")
                    }, null, 2)], 2), _createElementVNode("div", {
                        class: "setting-info"
                    }, [_createElementVNode("div", {
                        class: "setting-label"
                    }, "أصوات الإشعارات"), _createElementVNode("div", {
                        class: "setting-status"
                    }, [_createElementVNode("span", {
                        class: _normalizeClass(["status-dot", {
                            active: !e.isMuted
                        }])
                    }, null, 2), _createElementVNode("span", null, _toDisplayString(e.isMuted ? "صامت" : "مفعل"), 1)])])], 8, ["onClick"])])], 512), [
                        [_vShow, "settings" === e.activeTab]
                    ]), _createCommentVNode(" Profile Tab "), _withDirectives(_createElementVNode("div", {
                        class: "tab-content profile-settings"
                    }, [_createElementVNode("div", {
                        class: "section-header"
                    }, [_createElementVNode("i", {
                        class: "fa-solid fa-user-pen"
                    }), _createElementVNode("h3", null, "التخصيص الشخصي")]), _createCommentVNode(" Ultra Compact Profile Settings "), _createElementVNode("div", {
                        class: "profile-ultra-compact"
                    }, [_createCommentVNode(" Name Color Setting "), _createElementVNode("div", {
                        class: _normalizeClass(["compact-setting-row", {
                            disabled: !e.permissions.VIP.Message.Color
                        }])
                    }, [_createElementVNode("div", {
                        class: "compact-left"
                    }, [_createElementVNode("i", {
                        class: "fa-solid fa-palette"
                    }), _createElementVNode("span", null, "لون الرسالة")]), _createElementVNode("div", {
                        class: "compact-right"
                    }, [_createElementVNode("div", {
                        class: "color-picker-enhanced",
                        style: _normalizeStyle({
                            backgroundColor: e.selectedNameColor
                        })
                    }, [_withDirectives(_createElementVNode("input", {
                        type: "color",
                        "onUpdate:modelValue": t => e.selectedNameColor = t,
                        disabled: !e.permissions.VIP.Message.Color,
                        class: "color-picker-input",
                        onInput: t => e.permissions.VIP.Message.Color && e.applyNameColor()
                    }, null, 40, ["onUpdate:modelValue", "disabled", "onInput"]), [
                        [_vModelText, e.selectedNameColor]
                    ])], 4), e.permissions.VIP.Message.Color && e.hasCustomColor ? (_openBlock(), _createElementBlock("button", {
                        key: 0,
                        onClick: t => e.resetNameColor(),
                        class: "reset-color-btn",
                        title: "إزالة اللون"
                    }, [_createElementVNode("i", {
                        class: "fa-solid fa-rotate-left"
                    })], 8, ["onClick"])) : _createCommentVNode("v-if", !0), e.permissions.VIP.Message.Color ? _createCommentVNode("v-if", !0) : (_openBlock(), _createElementBlock("span", {
                        key: 1,
                        class: "lock-icon"
                    }, [_createElementVNode("i", {
                        class: "fa-solid fa-lock"
                    })]))])], 2), _createCommentVNode(" Cosmetics Toggle "), e.permissions.VIP.Cosmetics ? (_openBlock(), _createElementBlock("div", {
                        key: 0,
                        class: "compact-setting-row"
                    }, [_createElementVNode("div", {
                        class: "compact-left"
                    }, [_createElementVNode("i", {
                        class: "fa-solid fa-sparkles"
                    }), _createElementVNode("span", null, "خلفية الرسالة متحركة")]), _createElementVNode("div", {
                        class: "compact-right"
                    }, [_createElementVNode("div", {
                        class: _normalizeClass(["modern-toggle", {
                            active: e.cosmeticsEnabled
                        }]),
                        onClick: t => e.toggleCosmetics()
                    }, [_createElementVNode("div", {
                        class: "toggle-track"
                    }, [_createElementVNode("span", {
                        class: "toggle-label off"
                    }, "OFF"), _createElementVNode("span", {
                        class: "toggle-label on"
                    }, "ON")]), _createElementVNode("div", {
                        class: "toggle-thumb"
                    })], 10, ["onClick"])])])) : _createCommentVNode("v-if", !0), _createCommentVNode(" Send Animation Selector (VIP Feature) "), _createElementVNode("div", {
                        class: _normalizeClass(["compact-setting-row", {
                            disabled: !e.permissions.VIP.Message.Entrance
                        }])
                    }, [_createElementVNode("div", {
                        class: "compact-left"
                    }, [_createElementVNode("i", {
                        class: "fa-solid fa-wand-magic-sparkles"
                    }), _createElementVNode("span", null, "حركة رسالتك"), _createElementVNode("span", {
                        class: "vip-badge-mini"
                    }, "VIP")]), _createElementVNode("div", {
                        class: "compact-right"
                    }, [_withDirectives(_createElementVNode("select", {
                        "onUpdate:modelValue": t => e.sendAnimation = t,
                        onChange: t => e.selectAnimation(e.sendAnimation),
                        class: "vip-selector-dropdown",
                        disabled: !e.permissions.VIP.Message.Entrance
                    }, [(_openBlock(!0), _createElementBlock(_Fragment, null, _renderList(e.animations, e => (_openBlock(), _createElementBlock("option", {
                        key: e.id,
                        value: e.id
                    }, _toDisplayString(e.name), 9, ["value"]))), 128))], 40, ["onUpdate:modelValue", "onChange", "disabled"]), [
                        [_vModelSelect, e.sendAnimation]
                    ]), e.permissions.VIP.Message.Entrance ? _createCommentVNode("v-if", !0) : (_openBlock(), _createElementBlock("span", {
                        key: 0,
                        class: "lock-icon"
                    }, [_createElementVNode("i", {
                        class: "fa-solid fa-lock"
                    })]))])], 2), _createCommentVNode(" Font Selector (VIP Feature) "), _createElementVNode("div", {
                        class: _normalizeClass(["compact-setting-row", {
                            disabled: !e.permissions.VIP.Message.Font
                        }])
                    }, [_createElementVNode("div", {
                        class: "compact-left"
                    }, [_createElementVNode("i", {
                        class: "fa-solid fa-font"
                    }), _createElementVNode("span", null, "خط رسالتك"), _createElementVNode("span", {
                        class: "vip-badge-mini"
                    }, "VIP")]), _createElementVNode("div", {
                        class: "compact-right"
                    }, [_withDirectives(_createElementVNode("select", {
                        "onUpdate:modelValue": t => e.selectedFont = t,
                        onChange: t => e.selectFont(e.selectedFont),
                        class: "vip-selector-dropdown",
                        disabled: !e.permissions.VIP.Message.Font
                    }, [(_openBlock(!0), _createElementBlock(_Fragment, null, _renderList(e.arabicFonts, e => (_openBlock(), _createElementBlock("option", {
                        key: e.id,
                        value: e.id,
                        style: _normalizeStyle({
                            fontFamily: "default" === e.id ? "Tajawal" : e.name
                        })
                    }, _toDisplayString(e.name) + " - " + _toDisplayString(e.sample), 13, ["value"]))), 128))], 40, ["onUpdate:modelValue", "onChange", "disabled"]), [
                        [_vModelSelect, e.selectedFont]
                    ]), e.permissions.VIP.Message.Font ? _createCommentVNode("v-if", !0) : (_openBlock(), _createElementBlock("span", {
                        key: 0,
                        class: "lock-icon"
                    }, [_createElementVNode("i", {
                        class: "fa-solid fa-lock"
                    })]))])], 2), _createCommentVNode(" Name Animation Selector (VIP Feature) "), _createElementVNode("div", {
                        class: _normalizeClass(["compact-setting-row", {
                            disabled: !e.permissions.VIP.Message.NameAnim
                        }])
                    }, [_createElementVNode("div", {
                        class: "compact-left"
                    }, [_createElementVNode("i", {
                        class: "fa-solid fa-magic"
                    }), _createElementVNode("span", null, "حركة الاسم"), _createElementVNode("span", {
                        class: "vip-badge-mini"
                    }, "VIP")]), _createElementVNode("div", {
                        class: "compact-right"
                    }, [_withDirectives(_createElementVNode("select", {
                        "onUpdate:modelValue": t => e.nameAnimation = t,
                        onChange: t => e.selectNameAnimation(e.nameAnimation),
                        class: "vip-selector-dropdown",
                        disabled: !e.permissions.VIP.Message.NameAnim
                    }, [(_openBlock(!0), _createElementBlock(_Fragment, null, _renderList(e.nameAnimations, e => (_openBlock(), _createElementBlock("option", {
                        key: e.id,
                        value: e.id
                    }, _toDisplayString(e.name), 9, ["value"]))), 128))], 40, ["onUpdate:modelValue", "onChange", "disabled"]), [
                        [_vModelSelect, e.nameAnimation]
                    ]), e.permissions.VIP.Message.NameAnim ? _createCommentVNode("v-if", !0) : (_openBlock(), _createElementBlock("span", {
                        key: 0,
                        class: "lock-icon"
                    }, [_createElementVNode("i", {
                        class: "fa-solid fa-lock"
                    })]))])], 2)]), _createCommentVNode(" Permission Notice "), e.permissions.VIP.Message.Color || e.permissions.VIP.Cosmetics ? _createCommentVNode("v-if", !0) : (_openBlock(), _createElementBlock("div", {
                        key: 0,
                        class: "permission-notice"
                    }, [_createElementVNode("i", {
                        class: "fa-solid fa-info-circle"
                    }), _createElementVNode("span", null, "بعض الميزات تحتاج صلاحيات خاصة")]))], 512), [
                        [_vShow, "profile" === e.activeTab]
                    ]), _createCommentVNode(" Admin Tab (Regular - not message context) "), _withDirectives(_createElementVNode("div", {
                        class: "tab-content admin-controls"
                    }, [_createElementVNode("div", {
                        class: "admin-warning"
                    }, [_createElementVNode("i", {
                        class: "fa-solid fa-shield-halved"
                    }), _createElementVNode("span", null, "صلاحيات متقدمة")]), _createElementVNode("div", {
                        class: "admin-grid"
                    }, [e.permissions.CreatePoll ? (_openBlock(), _createElementBlock("button", {
                        key: 0,
                        class: "admin-card info",
                        onClick: t => e.executeAction("poll")
                    }, [_createElementVNode("div", {
                        class: "admin-icon"
                    }, [_createElementVNode("i", {
                        class: "fa-solid fa-square-poll-vertical"
                    })]), _createElementVNode("div", {
                        class: "admin-label"
                    }, "إنشاء تصويت"), _createElementVNode("div", {
                        class: "admin-description"
                    }, "استطلاع رأي")], 8, ["onClick"])) : _createCommentVNode("v-if", !0), e.permissions.Clear ? (_openBlock(), _createElementBlock("button", {
                        key: 1,
                        class: "admin-card danger",
                        onClick: t => e.executeAction("clear-all")
                    }, [_createElementVNode("div", {
                        class: "admin-icon"
                    }, [_createElementVNode("i", {
                        class: "fa-solid fa-broom"
                    })]), _createElementVNode("div", {
                        class: "admin-label"
                    }, "مسح الشات"), _createElementVNode("div", {
                        class: "admin-description"
                    }, "تنظيف كامل للشات")], 8, ["onClick"])) : _createCommentVNode("v-if", !0), e.permissions.Disable ? (_openBlock(), _createElementBlock("button", {
                        key: 2,
                        class: "admin-card warning",
                        onClick: t => e.executeAction("toggle-chat")
                    }, [_createElementVNode("div", {
                        class: "admin-icon"
                    }, [_createElementVNode("i", {
                        class: "fa-solid fa-power-off"
                    })]), _createElementVNode("div", {
                        class: "admin-label"
                    }, "إيقاف الشات"), _createElementVNode("div", {
                        class: "admin-description"
                    }, "تعطيل/تفعيل")], 8, ["onClick"])) : _createCommentVNode("v-if", !0)])], 512), [
                        [_vShow, !e.messageContext && "admin" === e.activeTab]
                    ]), _createCommentVNode(" Muted Users Tab "), _withDirectives(_createElementVNode("div", {
                        class: "tab-content muted-users-content"
                    }, [_createElementVNode("div", {
                        class: "muted-header"
                    }, [_createElementVNode("div", {
                        class: "muted-title"
                    }, [_createElementVNode("i", {
                        class: "fa-solid fa-volume-xmark"
                    }), _createElementVNode("span", null, "إدارة المكتومين")]), _createElementVNode("button", {
                        class: "refresh-btn",
                        onClick: e.fetchMutedUsers,
                        title: "تحديث القائمة"
                    }, [_createElementVNode("i", {
                        class: "fa-solid fa-rotate"
                    })], 8, ["onClick"])]), _createCommentVNode(" Premium Manual Mute Section "), _createElementVNode("div", {
                        class: "mute-action-card"
                    }, [_createElementVNode("div", {
                        class: "mute-action-header"
                    }, [_createElementVNode("div", {
                        class: "mute-action-icon"
                    }, [_createElementVNode("i", {
                        class: "fa-solid fa-user-slash"
                    })]), _createElementVNode("div", {
                        class: "mute-action-title"
                    }, [_createElementVNode("span", {
                        class: "mute-action-label"
                    }, "كتم مستخدم متصل"), _createElementVNode("span", {
                        class: "mute-action-desc"
                    }, "أدخل معرف اللاعب المتصل للكتم")])]), _createElementVNode("div", {
                        class: "mute-action-controls"
                    }, [_createElementVNode("div", {
                        class: "mute-input-group"
                    }, [_withDirectives(_createElementVNode("input", {
                        "onUpdate:modelValue": t => e.manualMuteUserId = t,
                        type: "number",
                        placeholder: "معرف المستخدم",
                        class: _normalizeClass(["premium-mute-input", {
                            error: e.muteError
                        }]),
                        min: "1",
                        onKeyup: _withKeys(e.manualMuteUser, ["enter"]),
                        onKeypress: e.filterNumberInput,
                        onPaste: e.handlePaste,
                        disabled: e.isManualMuting
                    }, null, 42, ["onUpdate:modelValue", "onKeyup", "onKeypress", "onPaste", "disabled"]), [
                        [_vModelText, e.manualMuteUserId]
                    ]), _withDirectives(_createElementVNode("select", {
                        "onUpdate:modelValue": t => e.manualMuteDuration = t,
                        class: "premium-duration-select",
                        disabled: e.isManualMuting
                    }, [(_openBlock(!0), _createElementBlock(_Fragment, null, _renderList(e.muteDurations, e => (_openBlock(), _createElementBlock("option", {
                        key: e.value,
                        value: e.value
                    }, _toDisplayString(e.label), 9, ["value"]))), 128))], 8, ["onUpdate:modelValue", "disabled"]), [
                        [_vModelSelect, e.manualMuteDuration]
                    ])]), _createElementVNode("button", {
                        class: "premium-mute-btn",
                        onClick: e.manualMuteUser,
                        disabled: !e.manualMuteUserId || e.isManualMuting
                    }, [_createElementVNode("i", {
                        class: _normalizeClass(["fa-solid", e.isManualMuting ? "fa-spinner fa-spin" : "fa-ban"])
                    }, null, 2)], 8, ["onClick", "disabled"])]), _createCommentVNode(" Feedback Messages "), _createVNode(_Transition, {
                        name: "fade"
                    }, {
                        default: _withCtx(() => [e.muteError ? (_openBlock(), _createElementBlock("div", {
                            key: 0,
                            class: "mute-feedback error"
                        }, [_createElementVNode("i", {
                            class: "fa-solid fa-circle-exclamation"
                        }), _createElementVNode("span", null, _toDisplayString(e.muteError), 1)])) : _createCommentVNode("v-if", !0)]),
                        _: 1
                    }), _createVNode(_Transition, {
                        name: "fade"
                    }, {
                        default: _withCtx(() => [e.muteSuccess ? (_openBlock(), _createElementBlock("div", {
                            key: 0,
                            class: "mute-feedback success"
                        }, [_createElementVNode("i", {
                            class: "fa-solid fa-circle-check"
                        }), _createElementVNode("span", null, _toDisplayString(e.muteSuccess), 1)])) : _createCommentVNode("v-if", !0)]),
                        _: 1
                    })]), _createCommentVNode(" Premium Muted Users Grid "), e.mutedUsersList.length > 0 ? (_openBlock(), _createElementBlock("div", {
                        key: 0,
                        class: "muted-users-grid"
                    }, [(_openBlock(!0), _createElementBlock(_Fragment, null, _renderList(e.mutedUsersList, t => (_openBlock(), _createElementBlock("div", {
                        key: t.id,
                        class: _normalizeClass(["premium-muted-card", {
                            offline: !t.isOnline
                        }])
                    }, [_createElementVNode("div", {
                        class: "muted-card-header"
                    }, [_createElementVNode("div", {
                        class: _normalizeClass(["muted-card-avatar", {
                            online: t.isOnline
                        }])
                    }, [_createElementVNode("i", {
                        class: "fa-solid fa-user"
                    })], 2), _createElementVNode("div", {
                        class: "muted-card-info"
                    }, [_createElementVNode("div", {
                        class: "muted-card-name"
                    }, [_createTextVNode(_toDisplayString(t.name || "غير معروف") + " ", 1), t.isOnline ? (_openBlock(), _createElementBlock("span", {
                        key: 0,
                        class: "status-badge online"
                    }, [_createElementVNode("i", {
                        class: "fa-solid fa-circle"
                    }), _createTextVNode(" متصل ")])) : (_openBlock(), _createElementBlock("span", {
                        key: 1,
                        class: "status-badge offline"
                    }, [_createElementVNode("i", {
                        class: "fa-solid fa-circle"
                    }), _createTextVNode(" غير متصل ")]))]), _createElementVNode("div", {
                        class: "muted-card-id"
                    }, "ID: " + _toDisplayString(t.id), 1)]), _createElementVNode("button", {
                        class: "muted-card-action",
                        onClick: a => e.unmuteSingleUser(t.id),
                        title: "إلغاء الكتم"
                    }, [_createElementVNode("i", {
                        class: "fa-solid fa-unlock"
                    })], 8, ["onClick"])]), _createElementVNode("div", {
                        class: "muted-card-meta"
                    }, [t.mutedBy ? (_openBlock(), _createElementBlock("div", {
                        key: 0,
                        class: "muted-meta-item"
                    }, [_createElementVNode("i", {
                        class: "fa-solid fa-user-shield"
                    }), _createElementVNode("span", null, _toDisplayString(t.mutedByName || t.mutedBy), 1)])) : _createCommentVNode("v-if", !0), t.remainingTime ? (_openBlock(), _createElementBlock("div", {
                        key: 1,
                        class: "muted-meta-item timer"
                    }, [_createElementVNode("i", {
                        class: "fa-solid fa-clock"
                    }), _createElementVNode("span", null, _toDisplayString(e.formatRemainingTime(t.remainingTime)), 1)])) : _createCommentVNode("v-if", !0)])], 2))), 128))])) : _createCommentVNode("v-if", !0)], 512), [
                        [_vShow, !e.messageContext && "muted" === e.activeTab && e.permissions.Mute]
                    ])])])])
                }
            }
        },
        setup() {
            let {
                onMounted: e,
                onUnmounted: t,
                watch: a,
                nextTick: s,
                computed: c
            } = Vue, g = e => {
                if (!e) return "";
                if (e.text) return e.text;
                if (e.message) return e.message;
                if (e.args && Array.isArray(e.args) && e.args.length > 0) {
                    let t = 0;
                    return t = 3 === e.args.length ? 2 : 2 === e.args.length ? 1 : 0, e.args[t] || ""
                }
                return ""
            }, p = !1, u = 0, h = [], f = (e, t, a = null) => {
                let s = (new Date).toLocaleTimeString(),
                    n = null;
                if (a) try {
                    n = JSON.parse(JSON.stringify(a))
                } catch (o) {
                    n = String(a)
                }
                let i = {
                    timestamp: s,
                    category: e,
                    message: t,
                    data: n
                };
                if (h.push(i), h.length > 100 && h.shift(), !p) return;
                let l = `[${s}][Chat Debug][${e}] ${t}`;
                a ? console.log(l + " | Data:", JSON.stringify(n, null, 2)) : console.log(l)
            }, v = reactive({
                chat: {},
                preInitialized: !1,
                debugMode: !1,
                storage: (() => {
                    try {
                        return JSON.parse(localStorage.getItem("storage")) || {
                            theme: "",
                            enableMessageGrouping: !0,
                            groupingTimeWindow: 3e5,
                            hideAvatars: !1,
                            isMuted: !1,
                            messageColorRgb: null,
                            color: null,
                            showTypingIndicator: !0
                        }
                    } catch (e) {
                        return console.error("فشل تحليل التخزين:", e), {
                            theme: "",
                            enableMessageGrouping: !0,
                            groupingTimeWindow: 3e5,
                            hideAvatars: !1,
                            isMuted: !1,
                            messageColorRgb: null,
                            color: null,
                            showTypingIndicator: !0
                        }
                    }
                })(),
                permissions: {
                    CreatePoll: !1,
                    VIP: {
                        Message: {
                            Color: !1,
                            Entrance: !1,
                            Font: !1,
                            NameAnim: !1
                        },
                        Cosmetics: !1,
                        Stickers: !1,
                        ServerEmojis: !1
                    },
                    ImagesAndLinks: [!1, !1]
                },
                isChatHidden: !1,
                isPauseMenuActive: !1,
                wasInputOpenBeforePause: !1,
                wasWindowOpenBeforePause: !1,
                userId: null,
                showInput: !1,
                showEmojis: !1,
                showStickers: !1,
                activePickerTab: "emojis",
                showChannelsPanel: !1,
                showQuickChannelSwitcher: !1,
                showPollsPanel: !1,
                chatDisabled: !1,
                showPollModal: !1,
                activePolls: {},
                currentChannelPoll: null,
                discordAssets: {
                    emojis: [],
                    stickers: [],
                    isLoaded: !1,
                    emojiByIndex: new Map,
                    stickerByIndex: new Map,
                    emojiUrlCache: new Map
                },
                showWindow: !0,
                showChatWindowTimer: null,
                message: "",
                selectedSticker: null,
                uploadedImages: [],
                isUploadingImage: !1,
                currentChannel: "شات العام",
                channels: [{
                    Title: "شات العام",
                    messages: [],
                    unreadCount: 0,
                    isStatic: !0
                }],
                channelMessagesMap: new Map,
                channelInfoMap: new Map,
                messageIdIndex: new Map,
                pinnedMessage: null,
                emojiSearch: "",
                activeEmojiTab: "server",
                replyingTo: null,
                typingUsers: [],
                reactingMessageId: null,
                emojiData: null,
                pickerMode: "unified",
                showOptionsPanel: !1,
                typingDisabledByServer: !1,
                messageContext: null,
                selectedMessageId: null,
                search: {
                    show: !1
                },
                modal: {
                    show: !1,
                    type: "info",
                    title: "",
                    text: "",
                    footer: "",
                    input: !1,
                    inputValue: "",
                    inputPlaceholder: "",
                    confirmText: "نعم",
                    cancelText: "لا",
                    showCancel: !1,
                    onConfirm: null,
                    onCancel: null
                }
            }), y = {
                inputRef: ref(null),
                messagesRef: ref(null),
                emojiPickerContainer: ref(null),
                optionsDropdownRef: ref(null),
                optionsPanelRef: ref(null)
            };
            o.init(e => {
                v.typingUsers = e
            }), window.GroupingCache = {
                cache: new Map,
                getGroupingKey: (e, t) => e && t ? `${e.gId||"none"}_${t.gId||"none"}` : null,
                shouldGroup(e, t, a) {
                    if (!e || !t) return !1;
                    let s = this.getGroupingKey(e, t);
                    if (this.cache.has(s)) return this.cache.get(s);
                    let n = !1;
                    if (!e.forceUngrouped && a?.enableMessageGrouping && e.gId && t.gId) {
                        let o = e => e.userId ? String(e.userId) : e.args && e.args.length > 0 ? String(e.args[0] || "unknown") : e.author || "unknown",
                            i = o(e);
                        if (i === o(t) && "unknown" !== i && e.channel === t.channel && !t.edited) {
                            let l = parseInt(e.timestamp) || Date.now(),
                                r = parseInt(t.timestamp) || Date.now();
                            n = Math.abs(l - r) <= (a?.groupingTimeWindow || 3e5) && l >= r
                        }
                    }
                    return this.cache.set(s, n), n
                },
                invalidate(e) {
                    for (let [t] of this.cache) t.includes(e) && this.cache.delete(t)
                },
                clear() {
                    this.cache.clear()
                }
            };
            let C, k, E, $, b, N, V, I, M = {
                    cache: new Map,
                    getFlags(e) {
                        if (!e || !e.gId) return {};
                        if (this.cache.has(e.gId)) return this.cache.get(e.gId);
                        let t = {
                            isActivePoll: "poll" === e.type && e.pollData && !0 === e.pollData.active,
                            isPoll: "poll" === e.type,
                            isPinned: !0 === e.isPinned && "poll" !== e.type,
                            hasReactions: e.reactions && Object.keys(e.reactions).length > 0,
                            hasImages: e.images && e.images.length > 0,
                            hasStickers: e.stickers && e.stickers.length > 0,
                            isGroupable: !e.forceUngrouped && !e.isPinned,
                            shouldPreserve: !1
                        };
                        return t.shouldPreserve = t.isPinned && !t.isPoll, this.cache.set(e.gId, t), t
                    },
                    updateFlag(e, t, a) {
                        let s = this.cache.get(e);
                        s && (s[t] = a, "isPinned" !== t && "isActivePoll" !== t || (s.shouldPreserve = s.isPinned && !s.isPoll || s.isActivePoll))
                    },
                    clear(e) {
                        e ? this.cache.delete(e) : this.cache.clear()
                    },
                    invalidate(e) {
                        this.clear(e)
                    }
                },
                _ = {
                    getChannelKey: e => `static:${e}`,
                    getChannelMessages(e) {
                        let t = this.getChannelKey(e);
                        return [...v.channelMessagesMap.get(t) || []]
                    },
                    addChannelMessage(e, t) {
                        w.invalidate();
                        let a = this.getChannelKey(e),
                            s = v.channelMessagesMap.get(a) || [];
                        if (s.length >= 35) {
                            let n = [],
                                o = [];
                            for (let i = 0; i < s.length; i++) {
                                let l = s[i],
                                    r = M.getFlags(l),
                                    c = r.isPinned || v.pinnedMessage && v.pinnedMessage.gId === l.gId;
                                r.isActivePoll || c ? n.push(l) : o.push(l)
                            }
                            let d = 35 - n.length - 1;
                            if (o.length > d) {
                                let m = o.slice(0, o.length - d);
                                for (let g = 0; g < m.length; g++) {
                                    let p = m[g];
                                    p && p.gId && v.messageIdIndex.delete(p.gId)
                                }
                                s = [...n, ...o.slice(-d)]
                            }
                        }
                        t.displayOrder || (t.displayOrder = t.timestamp || Date.now()), s.push(t), v.channelMessagesMap.set(a, s), w.invalidate(), t && t.gId && v.messageIdIndex.set(t.gId, t), e === v.currentChannel && (v.channelMessagesMap = new Map(v.channelMessagesMap))
                    },
                    clearChannelMessages(e, t = !0) {
                        let a = this.getChannelKey(e),
                            s = v.channelMessagesMap.get(a) || [],
                            n = [];
                        for (let o = 0; o < s.length; o++) {
                            let i = s[o],
                                l = "poll" === i.type && i.pollData && !0 === i.pollData.active,
                                r = i.isPinned || v.pinnedMessage && v.pinnedMessage.gId === i.gId;
                            t && (l || r) ? (n.push(i), f("POLL_PRESERVE", `Preserving ${l?"poll":"pinned"} message`, {
                                gId: i.gId,
                                channel: e,
                                pollActive: l
                            })) : i && i.gId && v.messageIdIndex.delete(i.gId)
                        }
                        v.channelMessagesMap.set(a, n), w.invalidate()
                    }
                },
                w = {
                    cachedMessages: null,
                    lastChannel: null,
                    lastPinnedId: null,
                    lastPinnedChannel: null,
                    lastMessageCount: 0,
                    lastUpdateTime: 0,
                    invalidate() {
                        this.cachedMessages = null
                    },
                    isValid(e, t, a) {
                        return null !== this.cachedMessages && this.lastChannel === e && this.lastMessageCount === t.length && this.lastPinnedId === (a?.gId || null) && this.lastPinnedChannel === (a?.channel || null)
                    },
                    update(e, t, a, s) {
                        this.cachedMessages = s, this.lastChannel = e, this.lastMessageCount = t.length, this.lastPinnedId = a?.gId || null, this.lastPinnedChannel = a?.channel || null, this.lastUpdateTime = Date.now()
                    }
                },
                T = {
                    currentChannelMessages: c(() => {
                        _.getChannelKey(v.currentChannel);
                        let e = _.getChannelMessages(v.currentChannel);
                        if (w.isValid(v.currentChannel, e, v.pinnedMessage)) return w.cachedMessages;
                        let t = [],
                            a = [];
                        for (let s = 0; s < e.length; s++) {
                            let n = e[s],
                                o = M.getFlags(n);
                            o.isPoll && (n.isPinned = !1), o.isPoll || !v.pinnedMessage || v.pinnedMessage.gId !== n.gId || v.pinnedMessage.channel !== v.currentChannel ? t.push(n) : a.push({
                                ...v.pinnedMessage,
                                isPinned: !0,
                                forceUngrouped: !0,
                                displayOrder: Number.MAX_SAFE_INTEGER
                            })
                        }
                        if (a.length > 0) {
                            let i = new Set(a.map(e => e.gId)),
                                l = [];
                            for (let r = 0; r < t.length; r++) i.has(t[r].gId) || l.push(t[r]);
                            t = l, a.sort((e, t) => (e.displayOrder || 0) - (t.displayOrder || 0)), t.push(...a)
                        }
                        return w.update(v.currentChannel, e, v.pinnedMessage, t), t
                    }),
                    hasAdminPermissions: c(() => v.permissions.Mute || v.permissions.Delete || v.permissions.Clear || v.permissions.Disable || v.permissions.Pin || v.permissions.CreatePoll),
                    showExpansion: c(() => {
                        let e = y.inputRef.value?.stickers?.length > 0;
                        return v.replyingTo || v.showEmojis || v.showChannelsPanel || v.showPollsPanel || v.showOptionsPanel || e
                    }),
                    lastFiveMessages: (C = [], k = null, E = 0, c(() => {
                        if (v.currentChannel === k) {
                            let e = null;
                            for (let t = 0; t < v.channels.length; t++)
                                if (v.channels[t].Title === v.currentChannel) {
                                    e = v.channels[t];
                                    break
                                } if (e && e.messages.length === E) return C
                        }
                        let a = null;
                        for (let s = 0; s < v.channels.length; s++)
                            if (v.channels[s].Title === v.currentChannel) {
                                a = v.channels[s];
                                break
                            } if (!a) return C = [], k = v.currentChannel, E = 0, C;
                        let n = new Set,
                            o = [];
                        for (let i = a.messages.length - 1; i >= 0 && o.length < 5; i--) {
                            let l = a.messages[i];
                            if (l.gId) {
                                let r = l.gId.split("_")[1];
                                n.has(r) || (n.add(r), o.push(l))
                            }
                        }
                        return C = o, k = v.currentChannel, E = a.messages.length, C
                    })),
                    hasMultipleChannels: ($ = null, b = -1, c(() => {
                        let e = v.channels ? v.channels.length : 0;
                        return b === e && null !== $ || (b = e, $ = v.channels && v.channels.length > 1), $
                    })),
                    totalUnreadCount: (N = null, V = 0, I = null, c(() => {
                        let e = Date.now(),
                            t = v.currentChannel;
                        if (null !== N && e - V < 100 && I === t) return N;
                        let a = 0;
                        for (let s = 0; s < v.channels.length; s++) {
                            let n = v.channels[s];
                            n.Title !== t && (a += n.unreadCount || 0)
                        }
                        return v.permissions.Channels && v.permissions.Channels.forEach(e => {
                            e.Title !== t && (a += e.unreadCount || 0)
                        }), V = e, I = t, N = a, a
                    })),
                    currentChannelColor: c(() => {
                        let e = null;
                        for (let t = 0; t < v.channels.length; t++)
                            if (v.channels[t].Title === v.currentChannel) {
                                e = v.channels[t];
                                break
                            } return e?.color || "#9b59b6"
                    }),
                    processedReplyBar: c(() => {
                        if (!v.replyingTo) return null;
                        let e = v.replyingTo.fullText || v.replyingTo.text || "",
                            t = e;
                        if (t = (t = t.replace(/:(\d+):/g, (e, t) => {
                                let a = parseInt(t),
                                    s = v.discordAssets?.emojiByIndex?.get(a);
                                return s && s.url ? `<img src="${s.url}" class="reply-emoji custom-emoji-msg" alt=":${t}:">` : e
                            })).replace(/(\p{Emoji_Presentation}|\p{Emoji}\uFE0F)/gu, e => {
                                let t = [];
                                for (let a = 0; a < e.length; a++) {
                                    let s = e.charCodeAt(a);
                                    if (s >= 55296 && s <= 56319 && a + 1 < e.length) {
                                        let n = 1024 * (s - 55296) + (e.charCodeAt(++a) - 56320) + 65536;
                                        t.push(n.toString(16))
                                    } else t.push(s.toString(16).padStart(4, "0"))
                                }
                                return `<img src="https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/${t.join("-")}.png" class="reply-emoji emoji-apple" alt="${e}" loading="lazy">`
                            }), [
                                [/\[spoiler\]([\s\S]*?)\[\/spoiler\]/gi, '<span class="spoiler">$1</span>'],
                                [/\[b\]([\s\S]*?)\[\/b\]/gi, "<strong>$1</strong>"],
                                [/\[i\]([\s\S]*?)\[\/i\]/gi, "<em>$1</em>"],
                                [/\[u\]([\s\S]*?)\[\/u\]/gi, "<u>$1</u>"],
                                [/\[s\]([\s\S]*?)\[\/s\]/gi, "<s>$1</s>"],
                                [/\[code\]([\s\S]*?)\[\/code\]/gi, "<code>$1</code>"]
                            ].forEach(([e, a]) => {
                                t = t.replace(e, a)
                            }), t = (t = (t = (t = (t = t.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")).replace(/\*([^*]+)\*/g, "<em>$1</em>")).replace(/_([^_]+)_/g, "<em>$1</em>")).replace(/~~([^~]+)~~/g, "<s>$1</s>")).replace(/`([^`]+)`/g, "<code>$1</code>"), e.length > 50) {
                            let a = document.createElement("div");
                            a.innerHTML = t;
                            let s = 0,
                                n = e => {
                                    if (s >= 50) return "";
                                    if (e.nodeType === Node.TEXT_NODE) {
                                        let t = 50 - s;
                                        return e.textContent.length <= t ? (s += e.textContent.length, e.textContent) : (s = 50, e.textContent.substring(0, t) + "...")
                                    }
                                    if (e.nodeType === Node.ELEMENT_NODE) {
                                        if ("IMG" === e.tagName) return (s += 2) <= 50 ? e.outerHTML : "";
                                        let a = `<${e.tagName.toLowerCase()}`;
                                        for (let o of e.attributes) a += ` ${o.name}="${o.value}"`;
                                        for (let i of (a += ">", e.childNodes))
                                            if (a += n(i), s >= 50) break;
                                        return a + `</${e.tagName.toLowerCase()}>`
                                    }
                                    return ""
                                },
                                o = "";
                            for (let i of a.childNodes)
                                if (o += n(i), s >= 50) break;
                            t = o
                        }
                        let l = "#ffffff";
                        if (v.replyingTo.color) {
                            if (Array.isArray(v.replyingTo.color) && v.replyingTo.color.length >= 3) {
                                let [r, c, d] = v.replyingTo.color.map(e => Math.min(255, Math.max(0, parseInt(e) || 0)));
                                l = `rgb(${r}, ${c}, ${d})`
                            } else "string" == typeof v.replyingTo.color && (l = v.replyingTo.color)
                        }
                        return {
                            author: v.replyingTo.author,
                            authorColor: l,
                            text: t
                        }
                    })
                },
                S = {
                    openSearch() {
                        v.search.show = !0, v.search.query = "", v.search.highlightedMessageId = null, v.showOptionsPanel = !1, s(() => {
                            let e = document.querySelector(".search-input-minimal");
                            e?.focus()
                        })
                    },
                    closeSearch() {
                        v.search.show = !1, v.search.query = "", v.search.highlightedMessageId = null, v.search.matchCount = 0, document.querySelectorAll(".search-highlight-text").forEach(e => {
                            let t = e.parentNode;
                            t.replaceChild(document.createTextNode(e.textContent), e), t.normalize()
                        }), document.querySelectorAll(".search-match").forEach(e => {
                            e.classList.remove("search-match")
                        })
                    },
                    performSearch() {
                        if (document.querySelectorAll(".search-highlight-text").forEach(e => {
                                let t = e.parentNode;
                                t.replaceChild(document.createTextNode(e.textContent), e), t.normalize()
                            }), document.querySelectorAll(".search-match").forEach(e => {
                                e.classList.remove("search-match")
                            }), !v.search.query) return void(v.search.highlightedMessageId = null);
                        let e = v.search.query.toLowerCase(),
                            t = null,
                            a = (e, t) => {
                                let s = e.textContent,
                                    n = s.toLowerCase().indexOf(t);
                                if (-1 !== n) {
                                    let o = s.substring(0, n),
                                        i = s.substring(n, n + t.length),
                                        l = s.substring(n + t.length),
                                        r = e.parentNode,
                                        c = document.createDocumentFragment();
                                    o && c.appendChild(document.createTextNode(o));
                                    let d = document.createElement("span");
                                    if (d.className = "search-highlight-text", d.textContent = i, c.appendChild(d), l) {
                                        let m = document.createTextNode(l);
                                        c.appendChild(m), r.replaceChild(c, e), a(m, t)
                                    } else r.replaceChild(c, e);
                                    return !0
                                }
                                return !1
                            },
                            n = t => {
                                let s = !1;
                                if (t.classList?.contains("search-highlight-text") || t.classList?.contains("message-time") || t.classList?.contains("message-actions") || t.classList?.contains("reaction-pill")) return !1;
                                let o = Array.from(t.childNodes);
                                for (let i of o) i.nodeType === Node.TEXT_NODE ? a(i, e) && (s = !0) : i.nodeType === Node.ELEMENT_NODE && n(i) && (s = !0);
                                return s
                            };
                        T.currentChannelMessages.value.forEach(e => {
                            let a = document.querySelector(`[data-msg-id="${e.gId}"]`);
                            if (!a) return;
                            let s = a.closest(".message-item");
                            s && n(s) && (s.classList.add("search-match"), t || (t = e.gId))
                        }), v.search.matchCount = document.querySelectorAll(".search-highlight-text").length, t && (v.search.highlightedMessageId = t, s(() => {
                            let e = document.querySelector(`[data-msg-id="${t}"]`);
                            if (e) {
                                let a = e.closest(".message-item");
                                a?.scrollIntoView({
                                    behavior: "smooth",
                                    block: "center"
                                })
                            }
                        }))
                    }
                },
                x = {
                    requestAssetsFromClient() {
                        v.discordAssets.isLoaded || v.discordAssets.isLoading || (v.discordAssets.isLoading = !0, fetch("https://Easy-Chat-Max/RequestAssets", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({
                                type: "all"
                            })
                        }).catch(e => {
                            console.error("Failed to request assets:", e), v.discordAssets.isLoading = !1
                        }))
                    },
                    ...S,
                    clearChatWindowTimer() {
                        v.showChatWindowTimer && (clearTimeout(v.showChatWindowTimer), v.showChatWindowTimer = null)
                    },
                    resetChatWindowTimer() {
                        x.clearChatWindowTimer(), v.showChatWindowTimer = setTimeout(() => {
                            v.showInput
                        }, 5e3)
                    },
                    findMessageById: e => v.messageIdIndex.get(e) || null,
                    clearChatForAll() {
                        v.showOptionsPanel = !1, fetch("https://Easy-Chat-Max/clearAllChat", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({})
                        }).then(() => {
                            v.messageIdIndex.clear(), v.channelMessagesMap.forEach((e, t) => {
                                let a = [];
                                for (let s = 0; s < e.length; s++) {
                                    let n = e[s];
                                    M.getFlags(n).shouldPreserve && (a.push(n), n.gId && v.messageIdIndex.set(n.gId, n))
                                }
                                e.length = 0, e.push(...a)
                            });
                            for (let e = 0; e < v.channels.length; e++) {
                                let t = v.channels[e],
                                    a = [];
                                for (let s = 0; s < t.messages.length; s++) {
                                    let n = t.messages[s];
                                    M.getFlags(n).shouldPreserve && a.push(n)
                                }
                                t.messages = a
                            }
                        }).catch(() => {})
                    },
                    disableChatForAll() {
                        v.showOptionsPanel = !1, fetch("https://Easy-Chat-Max/toggleChat", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({})
                        }).catch(() => {})
                    },
                    toggleOptionsPanel() {
                        v.showOptionsPanel || (v.messageContext = null, v.selectedMessageId = null), v.showOptionsPanel = !v.showOptionsPanel, v.showOptionsPanel ? (v.showEmojis = !1, v.showQuickChannelSwitcher = !1) : (v.messageContext = null, v.selectedMessageId = null, v.showPollsPanel = !1, v.reactingMessageId = null)
                    },
                    handleOptionsPanelAction(e) {
                        switch (e) {
                            case "search":
                                x.openSearch();
                                break;
                            case "poll":
                                v.showPollsPanel = !0, v.showOptionsPanel = !1;
                                break;
                            case "hide-chat":
                                v.isChatHidden = !0, v.showWindow = !1, v.showOptionsPanel = !1, x.clearChatWindowTimer(), x.hideInput(!0);
                                break;
                            case "clear-my-chat":
                                let t = null;
                                for (let a = 0; a < v.channels.length; a++)
                                    if (v.channels[a].Title === v.currentChannel) {
                                        t = v.channels[a];
                                        break
                                    } if (t) {
                                    let s = [];
                                    for (let n = 0; n < t.messages.length; n++) {
                                        let o = t.messages[n];
                                        o.isPinned && "poll" !== o.type ? s.push(o) : "poll" === o.type && o.pollData && !0 === o.pollData.active && s.push(o)
                                    }
                                    t.messages = s
                                }
                                let i = _.getChannelKey(v.currentChannel),
                                    l = v.channelMessagesMap.get(i);
                                if (l) {
                                    let r = [];
                                    for (let c = 0; c < l.length; c++) {
                                        let d = l[c];
                                        d.isPinned && "poll" !== d.type || "poll" === d.type && d.pollData && !0 === d.pollData.active ? r.push(d) : d && d.gId && v.messageIdIndex.delete(d.gId)
                                    }
                                    v.channelMessagesMap.set(i, r)
                                }
                                v.showOptionsPanel = !1;
                                break;
                            case "clear-all":
                                x.clearChatForAll();
                                break;
                            case "toggle-chat":
                                x.disableChatForAll()
                        }
                    },
                    handleOptionsPanelToggle(e) {
                        switch (e) {
                            case "hideAvatars":
                                v.storage.hideAvatars = !v.storage.hideAvatars, A();
                                break;
                            case "isMuted":
                                v.storage.isMuted = !v.storage.isMuted, A();
                                break;
                            case "enableMessageGrouping":
                                v.storage.enableMessageGrouping = !v.storage.enableMessageGrouping, A();
                                break;
                            case "showTypingIndicator":
                                v.storage.showTypingIndicator = !v.storage.showTypingIndicator, A(), v.storage.showTypingIndicator || o.clear()
                        }
                        A()
                    },
                    handleNameColorUpdate(e) {
                        if (v.permissions.VIP.Message.Color) {
                            if (null === e) return v.storage.customMessageColor = null, v.permissions.VIP.Message.Color || (v.storage.messageColorRgb = null, v.storage.color = null), A(), void x.showNotification("تم إزالة تدرج VIP، احتفاظ بلون العنوان");
                            if (/^#[0-9A-F]{6}$/i.test(e)) {
                                let t = `rgb(${parseInt(e.substr(1,2),16)},${parseInt(e.substr(3,2),16)},${parseInt(e.substr(5,2),16)})`;
                                v.storage.messageColorRgb = t, v.storage.customMessageColor = t, v.storage.color = t, v.storage.cosmeticsEnabled = !1, A(), A(), x.showNotification("تم تحديث لون الاسم")
                            } else x.showModal({
                                type: "error",
                                title: "خطأ",
                                text: "اللون المدخل غير صحيح",
                                confirmText: "حسناً"
                            })
                        }
                    },
                    handleCosmeticsToggle(e) {
                        v.permissions.VIP.Cosmetics && (e && v.storage.customMessageColor && (v.storage.messageColorRgb = null, v.storage.color = null, v.storage.customMessageColor = null), v.storage.cosmeticsEnabled = e, A(), x.showNotification(e ? "تم تفعيل التأثيرات" : "تم إلغاء التأثيرات"))
                    },
                    handleSettingUpdate(e, t) {
                        v.storage[e] = t, "messageStyle" === e && document.documentElement.setAttribute("data-message-style", t), "defaultMessageAnimation" === e && x.showNotification("تم تحديث حركة الرسائل الافتراضية")
                    },
                    toggleChannelsPanel() {
                        v.showQuickChannelSwitcher = !v.showQuickChannelSwitcher, v.showQuickChannelSwitcher && (v.showEmojis = !1, v.reactingMessageId = null, v.activePickerTab = "emojis", v.showPollModal = !1, v.showPollsPanel = !1)
                    },
                    handlePollMessage(e) {
                        let t = (e.channel || "").trim(),
                            a = (v.currentChannel || "").trim(),
                            n = t || a;
                        if (t && a && t !== a) return;
                        let o = null;
                        if (e.pollData?.creatorId) {
                            let l = null;
                            for (let r = 0; r < v.channels.length; r++)
                                if (v.channels[r].Title === n) {
                                    l = v.channels[r];
                                    break
                                } if (l) {
                                let c = l.messages.find(t => t.authorId === e.pollData.creatorId && t.icon);
                                o = c?.icon
                            }
                        }
                        let d = void 0 === e.pollData?.active || e.pollData.active,
                            m = {
                                gId: e.id || `poll_${Date.now()}_${Math.random()}`,
                                type: "poll",
                                templateId: "poll",
                                render: function(e, t) {
                                    return null
                                },
                                message: e.message || e.pollData?.question || "استطلاع",
                                args: [e.pollData?.creatorName || e.name || "النظام", e.pollData?.question || ""],
                                author: e.pollData?.creatorName || e.name || "النظام",
                                authorId: e.pollData?.creatorId || 0,
                                icon: e.pollData?.creatorIcon || e.icon || "./images/user-avatar.png",
                                author_icon: e.pollData?.creatorIcon || e.icon || "./images/user-avatar.png",
                                timestamp: e.timestamp || Date.now(),
                                channel: n,
                                pollData: {
                                    ...e.pollData,
                                    active: d
                                },
                                isPoll: !0,
                                isPinned: !1,
                                reactions: {},
                                cosmetics: null,
                                bgColor: null
                            },
                            g = _.getChannelKey(n),
                            p = v.channelMessagesMap.get(g) || [],
                            u = p.find(t => "poll" === t.type && t.pollData?.id === e.pollData?.id);
                        if (u) Object.assign(u, m), m.gId && v.messageIdIndex.set(m.gId, u);
                        else {
                            if (p.length >= 35) {
                                let h = p.shift();
                                h && h.gId && v.messageIdIndex.delete(h.gId)
                            }
                            p.push(m), m.gId && v.messageIdIndex.set(m.gId, m)
                        }
                        v.channelMessagesMap.set(g, p), w.invalidate(), v.channelMessagesMap = new Map(v.channelMessagesMap);
                        let f = null;
                        for (let C = 0; C < v.channels.length; C++)
                            if (v.channels[C].Title === n) {
                                f = v.channels[C];
                                break
                            } if (f) {
                            let k = f.messages.find(t => "poll" === t.type && t.pollData?.id === e.pollData?.id);
                            if (k) Object.assign(k, m);
                            else {
                                if (f.messages.length >= 35) {
                                    let E = f.messages.findIndex(e => {
                                        let t = "poll" === e.type && e.pollData && !0 === e.pollData.active,
                                            a = e.isPinned || v.pinnedMessage && v.pinnedMessage.gId === e.gId;
                                        return !t && !a
                                    });
                                    if (-1 !== E) {
                                        let $ = f.messages[E];
                                        $ && $.gId && M.invalidate($.gId), f.messages.splice(E, 1)
                                    }
                                }
                                f.messages.push(m)
                            }
                            v.channels = [...v.channels]
                        }
                        s(() => {
                            n === a && y.messagesRef.value && i.softScrollToBottom()
                        })
                    },
                    updatePoll(e) {
                        v.activePolls[e.id] = e, v.currentChannelPoll?.id === e.id && (v.currentChannelPoll = e);
                        let t = _.getChannelKey(v.currentChannel),
                            a = v.channelMessagesMap.get(t) || [],
                            s = a.find(t => t.pollData?.id === e.id);
                        if (s) {
                            let n = {
                                    ...s,
                                    pollData: {
                                        ...e
                                    },
                                    lastUpdate: Date.now()
                                },
                                o = a.indexOf(s); - 1 !== o && (a[o] = n, n.gId && v.messageIdIndex.set(n.gId, n))
                        }
                        v.channelMessagesMap = new Map(v.channelMessagesMap);
                        let i = null;
                        for (let l = 0; l < v.channels.length; l++)
                            if (v.channels[l].Title === v.currentChannel) {
                                i = v.channels[l];
                                break
                            } if (i) {
                            let r = i.messages.find(t => t.pollData?.id === e.id);
                            if (r) {
                                let c = {
                                        ...r,
                                        pollData: {
                                            ...e
                                        },
                                        lastUpdate: Date.now()
                                    },
                                    d = i.messages.indexOf(r); - 1 !== d && (i.messages[d] = c)
                            }
                            v.channels = [...v.channels]
                        }
                        w.invalidate(), v.forceUpdate = Date.now()
                    },
                    startReply(e) {
                        if (!e || !e.gId) return;
                        let t = e.args[0] || e.author || "غير معروف",
                            a = g(e),
                            s = document.createElement("div");
                        s.innerHTML = a, a = s.textContent || s.innerText || "", v.replyingTo = {
                            gId: e.gId,
                            author: t,
                            text: a,
                            fullText: a,
                            textProcessed: a,
                            displayText: a.substring(0, 50) + (a.length > 50 ? "..." : ""),
                            color: e.color || null,
                            args: e.args || null
                        }, v.showChannelsPanel && (v.showChannelsPanel = !1), y.inputRef.value?.focus()
                    },
                    togglePicker() {
                        v.showEmojis ? "emojis" === v.activePickerTab ? v.activePickerTab = "stickers" : (v.activePickerTab = "emojis", v.showEmojis = !1) : (v.showEmojis = !0, v.activePickerTab = "emojis")
                    },
                    handlePickerTabChange(e) {
                        v.activePickerTab = e
                    },
                    openSettings() {
                        v.showOptionsPanel = !1
                    },
                    cancelReply: () => v.replyingTo = null,
                    pinMessage(e) {
                        if (e && e.gId && v.permissions.Pin) {
                            if (v.pinnedMessage?.gId === e.gId) {
                                v.pinnedMessage = null;
                                let t = v.messageIdIndex.get(e.gId);
                                t && (t.isPinned = !1, M.updateFlag(e.gId, "isPinned", !1), w.invalidate()), x.showNotification("تم إلغاء تثبيت الرسالة"), fetch("https://Easy-Chat-Max/unpinMessage", {
                                    method: "POST",
                                    headers: {
                                        "Content-Type": "application/json"
                                    },
                                    body: JSON.stringify({
                                        messageId: e.gId,
                                        channel: v.currentChannel
                                    })
                                }).catch(e => {
                                    console.error("فشل إلغاء تثبيت الرسالة:", e)
                                })
                            } else {
                                let a = v.messageIdIndex.get(e.gId);
                                a && (a.isPinned = !0, M.updateFlag(e.gId, "isPinned", !0), w.invalidate());
                                let s = v.messageIdIndex.get(e.gId) || e;
                                v.pinnedMessage = {
                                    ...s,
                                    channel: v.currentChannel,
                                    reactions: s.reactions ? {
                                        ...s.reactions
                                    } : {}
                                }, x.showNotification("تم تثبيت الرسالة"), fetch("https://Easy-Chat-Max/pinMessage", {
                                    method: "POST",
                                    headers: {
                                        "Content-Type": "application/json"
                                    },
                                    body: JSON.stringify({
                                        messageId: e.gId,
                                        channel: v.currentChannel
                                    })
                                }).catch(e => {
                                    console.error("فشل تثبيت الرسالة:", e)
                                })
                            }
                        }
                    },
                    muteSenderWithDuration(e) {
                        if (!e || !e.gId || !e.duration || !v.permissions.Mute) return;
                        let t = e.userId || e.gId.split("_")[1];
                        t && fetch("https://Easy-Chat-Max/muteWithDuration", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({
                                userId: t,
                                duration: e.duration
                            })
                        }).then(() => {
                            x.showNotification(`تم كتم المستخدم لمدة ${e.duration} دقيقة`)
                        }).catch(e => {
                            console.error("فشل كتم المستخدم:", e)
                        })
                    },
                    unmuteSender(e) {
                        if (!e || !e.gId || !v.permissions.Mute) return;
                        let t = e.gId.split("_")[1];
                        t && x.showModal({
                            type: "info",
                            title: "إلغاء الكتم",
                            text: `هل تريد السماح لـ ${e.author||e.args?.[0]||"هذا المستخدم"} بالإرسال؟`,
                            showCancel: !0,
                            confirmText: "إلغاء الكتم",
                            cancelText: "إلغاء",
                            onConfirm() {
                                fetch("https://Easy-Chat-Max/unmuteSender", {
                                    method: "POST",
                                    headers: {
                                        "Content-Type": "application/json"
                                    },
                                    body: JSON.stringify({
                                        senderId: t,
                                        senderName: e.author || e.args?.[0] || "غير معروف"
                                    })
                                }).then(() => {
                                    x.showNotification("تم إلغاء الكتم بنجاح", "success")
                                }).catch(e => {
                                    console.error("فشل إلغاء كتم المرسل:", e), x.showNotification("فشل إلغاء الكتم", "error")
                                })
                            }
                        })
                    },
                    showMessageOptions(e) {
                        let t = e.message;
                        if (t && t.gId) {
                            if (v.selectedMessageId === t.gId && v.showOptionsPanel) return v.messageContext = null, v.selectedMessageId = null, void(v.showOptionsPanel = !1);
                            t.isPinned = v.pinnedMessage?.gId === t.gId, v.messageContext = t, v.selectedMessageId = t.gId, v.showOptionsPanel = !0, s(() => {
                                y.optionsPanelRef.value && t.gId && y.optionsPanelRef.value.fetchReactionDetails(t.gId)
                            })
                        }
                    },
                    showLinkModal(e) {
                        let {
                            url: t,
                            callback: a
                        } = e;
                        x.showModal({
                            type: "warning",
                            title: "فتح رابط خارجي",
                            text: `هل أنت متأكد أنك تريد فتح هذا الرابط؟

${t}`,
                            showCancel: !0,
                            confirmText: "فتح الرابط",
                            cancelText: "إلغاء",
                            onConfirm() {
                                a && "function" == typeof a && a()
                            }
                        })
                    },
                    closeMessageOptions() {
                        v.messageContext = null, v.selectedMessageId = null, v.showOptionsPanel = !1
                    },
                    handleMessageAction(e, t) {
                        if (!e || !t || !t.gId) return;
                        let a = () => {
                            v.showOptionsPanel = !1, v.messageContext = null, v.selectedMessageId = null
                        };
                        switch (e) {
                            case "reply":
                                a(), x.startReply(t), s(() => {
                                    let e = y.inputRef.value?.editor;
                                    e && e.commands.focus()
                                });
                                break;
                            case "copy":
                                x.copyMessageText(t), a();
                                break;
                            case "react":
                                v.reactingMessageId = t.gId, v.activePickerTab = "emojis", v.showEmojis = !0, a();
                                break;
                            case "edit":
                                a(), x.handleEditMessage(t);
                                break;
                            case "delete-own":
                                a(), x.handleDeleteOwnMessage(t);
                                break;
                            case "admin-delete":
                                a(), x.handleAdminDeleteMessage(t);
                                break;
                            case "pin":
                                x.pinMessage(t), a();
                                break;
                            case "copyId":
                                x.copyMessageId(t), a();
                                break;
                            case "mute-with-duration":
                                x.muteSenderWithDuration(t), a();
                                break;
                            case "unmute":
                                x.unmuteSender(t), a();
                                break;
                            default:
                                a()
                        }
                    },
                    handleEditMessage(e) {
                        if (!e || !e.gId) return;
                        let t = g(e),
                            a = document.createElement("div");
                        a.innerHTML = t;
                        let s = a.textContent || a.innerText || "";
                        x.showModal({
                            type: "question",
                            title: "تعديل الرسالة",
                            text: "قم بتعديل رسالتك:",
                            input: !0,
                            inputValue: s,
                            inputPlaceholder: "اكتب رسالتك المعدلة هنا...",
                            confirmText: "حفظ التعديل",
                            cancelText: "إلغاء",
                            showCancel: !0,
                            onConfirm(t) {
                                t && t.trim() && t !== s && fetch("https://Easy-Chat-Max/editMessage", {
                                    method: "POST",
                                    headers: {
                                        "Content-Type": "application/json"
                                    },
                                    body: JSON.stringify({
                                        gId: e.gId,
                                        Msg: t.trim()
                                    })
                                }).then(() => {
                                    x.showNotification("تم تعديل الرسالة بنجاح")
                                }).catch(e => {
                                    console.error("Failed to edit message:", e), x.showModal({
                                        type: "error",
                                        title: "خطأ",
                                        text: "فشل تعديل الرسالة. حاول مرة أخرى."
                                    })
                                })
                            }
                        })
                    },
                    handleDeleteOwnMessage(e) {
                        e && e.gId && fetch("https://Easy-Chat-Max/deleteOwnMessage", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({
                                gId: e.gId
                            })
                        }).then(() => {
                            x.showNotification("تم حذف رسالتك")
                        }).catch(e => {
                            console.error("Failed to delete own message:", e)
                        })
                    },
                    handleAdminDeleteMessage(e) {
                        e && e.gId && fetch("https://Easy-Chat-Max/adminDeleteMessage", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({
                                gId: e.gId
                            })
                        }).then(() => {
                            x.showNotification("تم حذف الرسالة بصلاحيات إدارية")
                        }).catch(e => {
                            console.error("Failed to admin delete message:", e)
                        })
                    },
                    copyMessageText(e) {
                        if (!e || !e.gId) return;
                        let t = g(e),
                            a = document.createElement("div");
                        a.innerHTML = t;
                        let s = a.textContent || a.innerText || "";
                        s && navigator.clipboard ? navigator.clipboard.writeText(s).then(() => {
                            x.showNotification("تم نسخ الرسالة")
                        }).catch(() => {
                            x.fallbackCopy(s)
                        }) : s && x.fallbackCopy(s)
                    },
                    copyMessageId(e) {
                        if (!e || !e.gId) return;
                        let t = e.gId;
                        t && navigator.clipboard ? navigator.clipboard.writeText(t).then(() => {
                            x.showNotification("تم نسخ المعرف")
                        }).catch(() => {
                            x.fallbackCopy(t)
                        }) : t && x.fallbackCopy(t)
                    },
                    fallbackCopy(e) {
                        let t = document.createElement("textarea");
                        t.value = e, t.style.position = "fixed", t.style.opacity = "0", document.body.appendChild(t), t.select(), document.execCommand("copy"), document.body.removeChild(t), x.showNotification("تم النسخ")
                    },
                    showNotification(e) {
                        let t = document.createElement("div");
                        t.className = "action-success-notification", t.innerHTML = `<i class="fa-solid fa-check-circle" style="margin-right: 8px;"></i>${e}`, document.body.appendChild(t), setTimeout(() => {
                            t.classList.add("fade-out"), setTimeout(() => {
                                document.body.contains(t) && document.body.removeChild(t)
                            }, 300)
                        }, 2e3)
                    },
                    handleReaction(e, t) {
                        if (!e) return;
                        let a = v.config?.Settings?.Filter?.InappropriateEmojis || ["\uD83C\uDF46", "\uD83C\uDF51", "\uD83E\uDD52", "\uD83C\uDF2D", "\uD83E\uDD55", "\uD83C\uDF4C", "\uD83C\uDF52", "\uD83D\uDCA6", "\uD83D\uDC49", "\uD83D\uDC4C", "\uD83D\uDD95"];
                        if (!t || !a.includes(t)) {
                            if (t) {
                                let s = `${e}_${t}`;
                                if (v.pendingReactions && v.pendingReactions[s]) return;
                                if (v.pendingReactions || (v.pendingReactions = {}), v.pendingReactions[s] = !0, !l.canRequest(`reaction-${e}`, 300)) return void delete v.pendingReactions[s];
                                fetch("https://Easy-Chat-Max/addReaction", {
                                    method: "POST",
                                    headers: {
                                        "Content-Type": "application/json"
                                    },
                                    body: JSON.stringify({
                                        messageId: e,
                                        reaction: t
                                    })
                                }).then(e => {
                                    if (!e.ok) throw Error("رفض الخادم التفاعل")
                                }).catch(e => {
                                    console.error("Failed to add reaction:", e)
                                }).finally(() => {
                                    delete v.pendingReactions[s]
                                })
                            } else {
                                let n = x.findMessageById(e);
                                if (n && n.reactions && Object.keys(n.reactions).filter(e => "_lastUpdate" !== e && "_lock" !== e && n.reactions[e] && n.reactions[e].length > 0).length >= 4) return;
                                v.reactingMessageId = e, v.activePickerTab = "emojis", v.showEmojis = !0, v.showChannelsPanel = !1, v.showExpansion = !0
                            }
                        }
                    },
                    handleTyping: m.throttle(() => {
                        v.storage.showTypingIndicator && !v.typingDisabledByServer && fetch("https://Easy-Chat-Max/typing", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({
                                channel: v.currentChannel
                            })
                        }).catch(e => {})
                    }, 3e3),
                    handleEmojiSelect(e) {
                        let t = v.config?.Settings?.Filter?.InappropriateEmojis || ["\uD83C\uDF46", "\uD83C\uDF51", "\uD83E\uDD52", "\uD83C\uDF2D", "\uD83E\uDD55", "\uD83C\uDF4C", "\uD83C\uDF52", "\uD83D\uDCA6", "\uD83D\uDC49", "\uD83D\uDC4C", "\uD83D\uDD95"],
                            a = e.native || "";
                        if (!t.includes(a) && (!e.isCustom || v.permissions.VIP?.ServerEmojis)) {
                            if (v.reactingMessageId) {
                                let n = e.native || e.shortcodes;
                                e.isCustom && (n = e.shortcodes), x.handleReaction(v.reactingMessageId, n), v.reactingMessageId = null, v.showEmojis = !1
                            } else y.inputRef.value?.insertEmoji ? y.inputRef.value.insertEmoji(e) : y.inputRef.value?.insertText && y.inputRef.value.insertText(e), s(() => {
                                if (y.inputRef.value?.focus) {
                                    y.inputRef.value.focus();
                                    let e = y.inputRef.value?.editorElement;
                                    if (e) {
                                        let t = e.querySelector(".ProseMirror");
                                        t && t.focus()
                                    }
                                }
                            })
                        }
                    },
                    handleStickerSelect(e) {
                        if (!v.permissions.VIP?.Stickers) return;
                        v.uploadedImages.length > 0 && (v.uploadedImages = [], y.inputRef.value?.clearUploadedImages && y.inputRef.value.clearUploadedImages()), v.selectedSticker = e;
                        let t = document.querySelector(".sticker-preview-item");
                        t && (t.classList.add("replacing"), setTimeout(() => {
                            t.classList.remove("replacing")
                        }, 400)), v.showEmojis = !1, s(() => {
                            if (y.inputRef.value?.focus) {
                                y.inputRef.value.focus();
                                let e = y.inputRef.value?.editorElement;
                                if (e) {
                                    let t = e.querySelector(".ProseMirror");
                                    t && t.focus()
                                }
                            }
                        })
                    },
                    handleImageUpload(e) {
                        "start" === e.status ? v.isUploadingImage = !0 : "complete" === e.status ? v.isUploadingImage = !1 : "error" === e.status && (v.isUploadingImage = !1, console.error("Image upload error:", e.error))
                    },
                    handleImageUploaded(e) {
                        v.selectedSticker && (v.selectedSticker = null), v.uploadedImages = e, document.querySelectorAll(".image-button-badge").forEach(e => {
                            e.classList.add("replacing"), setTimeout(() => {
                                e.classList.remove("replacing")
                            }, 400)
                        })
                    },
                    send() {
                        if (f("SEND_CALLED", "Send function triggered", {
                                chatDisabled: v.chatDisabled,
                                isDisabled: v.isDisabled,
                                message: v.message,
                                messageLength: v.message ? v.message.length : 0,
                                currentChannel: v.currentChannel,
                                showInput: v.showInput,
                                modalShowing: v.modal.show
                            }), v.chatDisabled) return void f("SEND_BLOCKED", "Chat is disabled", {
                            chatDisabled: v.chatDisabled
                        });
                        let e = v.message;
                        if (y.inputRef.value?.getFormattedContent ? f("MSG_FORMAT", "Got formatted content", {
                                formatted: e = y.inputRef.value.getFormattedContent()
                            }) : y.inputRef.value?.getText && f("MSG_FORMAT", "Got plain text", {
                                text: e = y.inputRef.value.getText()
                            }), v.isUploadingImage) return void x.showNotification("يرجى الانتظار حتى يتم رفع الصورة", "info");
                        if (v.modal.show) return;
                        let t = null,
                            a = null;
                        v.selectedSticker && v.permissions.VIP?.Stickers && (t = {
                            url: v.selectedSticker.src || v.selectedSticker.url,
                            name: v.selectedSticker.name,
                            shortcode: v.selectedSticker.shortcodes
                        }), v.uploadedImages.length > 0 && (a = v.uploadedImages.map(e => ({
                            url: e.url,
                            name: e.name,
                            type: e.type,
                            size: e.size
                        })));
                        let n = !m.isEmpty(e),
                            o = t || a;
                        if (f("MSG_PREPARE", "Preparing message for send", {
                                hasText: n,
                                hasMedia: o,
                                messageLength: e ? e.length : 0,
                                stickerData: !!t,
                                imagesCount: a ? a.length : 0,
                                currentChannel: v.currentChannel,
                                isDisabled: v.isDisabled
                            }), !n && !o) return f("MSG_EMPTY", "Message rejected - no text or media", {
                            messageToSend: e,
                            trimmedLength: e ? e.trim().length : 0
                        }), void x.hideInput(!0);
                        let r = e;
                        if (!v.permissions.VIP?.ServerEmojis) {
                            let c = /:\d+:/.test(r);
                            r = r.replace(/:\d+:/g, ""), c && x.showNotification("تم إزالة الايموجيات الخاصة", "warning")
                        }(v.config?.Settings?.Filter?.InappropriateEmojis || ["\uD83C\uDF46", "\uD83C\uDF51", "\uD83E\uDD52", "\uD83C\uDF2D", "\uD83E\uDD55", "\uD83C\uDF4C", "\uD83C\uDF52", "\uD83D\uDCA6", "\uD83D\uDC49", "\uD83D\uDC4C", "\uD83D\uDD95"]).forEach(e => {
                            r = r.replace(RegExp(e, "g"), "")
                        });
                        let d = r.trim(),
                            [g, p] = v.chat?.Settings?.Filter?.Length || [1, 500];
                        if (!o && !v.permissions.Bypass) {
                            if (0 === d.length) return f("MSG_REJECTED", "Message empty after trim", {
                                originalLength: r.length,
                                trimmedLength: d.length
                            }), void x.showNotification("لا يمكن أن تكون الرسالة فارغة", "error");
                            let u = v.chat?.Settings?.Filter?.Images?.Enabled && v.permissions.ImagesAndLinks?.[0] ? r.replace(/(https?:\/\/[^\s]+?\.(?:png|jpg|gif|jpeg|webp)(?:\?[^\s]*)?)/gi, "").length : r.length;
                            if (f("MSG_LENGTH_CHECK", "Checking message length", {
                                    effectiveLength: u,
                                    minLength: g,
                                    maxLength: p,
                                    passedCheck: u >= g && u <= p
                                }), u < g || u > p) return f("MSG_REJECTED", "Message length out of bounds", {
                                effectiveLength: u,
                                minLength: g,
                                maxLength: p
                            }), void x.showModal({
                                type: "error",
                                title: "خطأ",
                                text: `لا يمكنك ارسال رسالة تقل عن ${g} حرف او اعلى من ${p} حرف`
                            })
                        }
                        let h = v.replyingTo ? {
                            gId: v.replyingTo.gId,
                            author: v.replyingTo.author,
                            text: v.replyingTo.text,
                            fullText: v.replyingTo.fullText || v.replyingTo.text,
                            textProcessed: v.replyingTo.textProcessed,
                            displayText: v.replyingTo.displayText,
                            color: v.replyingTo.color,
                            args: v.replyingTo.args
                        } : null;
                        if (!l.canRequest("sendMessage", 500)) return void f("MSG_THROTTLED", "Message blocked by throttler", {
                            waitTime: "500ms"
                        });
                        let C = {
                            message: r,
                            channel: v.currentChannel || "شات العام",
                            userId: v.userId,
                            customColor: v.permissions.VIP.Message.Color ? v.storage?.customMessageColor : null,
                            cosmetics: !(!v.permissions.VIP.Cosmetics || !0 !== v.storage?.cosmeticsEnabled || v.storage?.customMessageColor),
                            messageAnimation: v.permissions.VIP.Message.Entrance ? v.storage?.sendAnimation || "fadeIn" : null,
                            font: v.permissions.VIP.Message.Font && v.storage?.messageFont && "default" !== v.storage?.messageFont ? v.storage?.messageFont : null,
                            nameAnimation: v.permissions.VIP.Message.NameAnim && v.storage?.nameAnimation && "none" !== v.storage?.nameAnimation ? v.storage?.nameAnimation : null,
                            replyTo: h,
                            sticker: t,
                            images: a
                        };
                        f("MSG_SEND_ATTEMPT", "Attempting to send message", {
                            messageLength: r.length,
                            channel: C.channel,
                            hasReply: !!h,
                            hasSticker: !!t,
                            hasImages: !!(a && a.length > 0),
                            userId: v.userId
                        }), fetch("https://Easy-Chat-Max/sendMessage", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify(C)
                        }).then(e => (f("MSG_SEND_RESPONSE", "Fetch response received", {
                            ok: e.ok,
                            status: e.status,
                            statusText: e.statusText
                        }), e)).catch(e => {
                            f("MSG_SEND_ERROR", "Fetch error occurred", {
                                error: e.toString(),
                                message: e.message
                            })
                        }), y.inputRef.value?.addToHistory && "" !== r.trim() && y.inputRef.value.addToHistory(r);
                        let k = a && a.length > 0;
                        v.replyingTo = null, v.selectedSticker = null, v.uploadedImages = [], y.inputRef.value?.clearContent && y.inputRef.value.clearContent(), s(() => {
                            v.message = ""
                        }), x.hideInput(!0), k && i.handleImageMessage(), v.showChannelsPanel && (v.showChannelsPanel = !1, v.showExpansion = !1)
                    },
                    hideInput(e = !1) {
                        x.setNuiFocus(!1, !1), y.inputRef.value?.clearContent && y.inputRef.value.clearContent(), s(() => {
                            v.message = ""
                        }), v.showInput = !1, v.showEmojis = !1, v.reactingMessageId = null, i.state.container && !i.isNearBottom() && i.scrollToBottom(!0), x.resetChatWindowTimer()
                    },
                    onMessage({
                        message: e
                    }) {
                        u++;
                        let t = u;
                        f("NUI_MSG_IN", `Message #${t} received`, {
                            gId: e.gId,
                            channel: e.channel,
                            args: e.args,
                            timestamp: e.timestamp,
                            hasGId: !!e.gId
                        });
                        let a = e.channel,
                            n = v.channels.find(t => t.Title === e.channel)?.bgColor,
                            o = {
                                ...e,
                                gId: e.gId || null,
                                timestamp: e.timestamp || Date.now(),
                                bgColor: n,
                                reactions: e.reactions || {},
                                cosmetics: e.cosmetics || null,
                                font: e.font || null,
                                nameAnimation: e.nameAnimation || null,
                                messageAnimation: e.messageAnimation || null,
                                customColor: e.customColor || null
                            },
                            l = "poll" === e.type || e.isPoll || !!e.pollData;
                        if (l && f("POLL_RECEIVED", `Poll message #${t} received`, {
                                gId: e.gId,
                                channel: e.channel,
                                active: e.pollData?.active,
                                question: e.pollData?.question
                            }), !e.gId || l) l && f("POLL_SKIP_DEDUP", `Poll #${t} bypassing deduplication`, {
                            gId: e.gId
                        });
                        else {
                            if (v.recentMessageHashes || (v.recentMessageHashes = new Map), v.recentMessageHashes.has(e.gId)) return void f("NUI_DEDUP", `Message #${t} blocked as duplicate (gId exists)`, {
                                gId: e.gId
                            });
                            let r = e.timestamp || Date.now();
                            if (v.recentMessageHashes.set(e.gId, {
                                    time: r,
                                    count: 0
                                }), f("NUI_DEDUP", `Message #${t} added to dedup cache`, {
                                    gId: e.gId,
                                    cacheSize: v.recentMessageHashes.size
                                }), v.recentMessageHashes.size > 100) {
                                let c = Date.now();
                                for (let [d, g] of v.recentMessageHashes) c - g.time > 5e3 && v.recentMessageHashes.delete(d)
                            }
                        }
                        let p = !1;
                        if (o.replyTo && v.userId) {
                            let h = v.messageIdIndex.get(o.replyTo.gId),
                                C = String(v.userId);
                            if (h) {
                                let k = null;
                                if (h.gId && "string" == typeof h.gId) {
                                    let E = h.gId.split("_");
                                    E.length >= 2 && /^\d+$/.test(E[1]) && (k = E[1])
                                }!k && h.userId && (k = String(h.userId));
                                let $ = null;
                                if (o.gId && "string" == typeof o.gId) {
                                    let b = o.gId.split("_");
                                    b.length >= 2 && /^\d+$/.test(b[1]) && ($ = b[1])
                                }!$ && o.userId && ($ = String(o.userId)), k === C && $ !== C && (p = !0, o.isReplyToMe = !0, v.storage?.isMuted || m.playSound("sounds/mention.mp3"))
                            }
                        }
                        if (v.userId && !p) {
                            let N = "";
                            e.text ? N = e.text : e.message ? N = e.message : e.args && Array.isArray(e.args) && (2 === e.args.length ? N = e.args[1] : 3 === e.args.length ? N = e.args[2] : 1 === e.args.length && (N = e.args[0]));
                            let V = String(v.userId),
                                I = /@everyone|@here/i.test(N),
                                w = [RegExp(`@${V}\\b`), RegExp(`<@${V}>`), RegExp(`@<${V}>`), RegExp(`<@!${V}>`)].some(e => e.test(N));
                            (I || w) && (o.hasMention = !0, v.storage?.isMuted || m.playSound("sounds/mention.mp3"))
                        }
                        if (window.MentionService && o && window.MentionService.updateKnownUsers([o]), f("NUI_MSG_ADD", `Adding message #${t} to channel`, {
                                channel: a,
                                gId: o.gId,
                                hasReply: !!o.replyTo,
                                hasMention: !!o.hasMention
                            }), _.addChannelMessage(a, o), a !== v.currentChannel && !v.isChatHidden) {
                            let T = v.channels.find(t => t.Title === e.channel);
                            T && (T.unreadCount || (T.unreadCount = 0), T.unreadCount++);
                            let S = v.permissions.Channels?.find(t => t.Title === e.channel);
                            S && (S.unreadCount || (S.unreadCount = 0), S.unreadCount++)
                        }
                        let x = v.channels.find(t => t.Title === e.channel);
                        if (x) {
                            if (x.messages.length >= 35) {
                                let P = x.messages.findIndex(e => {
                                    let t = "poll" === e.type && e.pollData && !0 === e.pollData.active,
                                        a = e.isPinned || v.pinnedMessage && v.pinnedMessage.gId === e.gId;
                                    return !t && !a
                                });
                                if (-1 !== P) {
                                    let D = x.messages[P];
                                    D && D.gId && M.invalidate(D.gId), x.messages.splice(P, 1)
                                } else {
                                    let B = x.messages[0];
                                    B && B.gId && M.invalidate(B.gId), x.messages.shift()
                                }
                            }
                            x.messages.push(o)
                        }
                        s(() => {
                            y.messagesRef.value && i.softScrollToBottom()
                        })
                    },
                    getMessageIdNumber: e => parseInt(e.gId.split("_")[1], 10),
                    getMessageName: e => e.gId.split("_")[2],
                    chatData({
                        data: e
                    }) {
                        v.userId = e.user_id;
                        let t = v.chat?.Settings?.Filter?.Emojis,
                            a = v.chat?.Settings?.Filter?.Stickers;
                        if ((0 === Object.keys(v.chat).length || 1 === Object.keys(v.chat).length && v.chat.Settings) && (Object.assign(v.chat, e.config), !t || e.config?.Settings?.Filter?.Emojis && 0 !== e.config.Settings.Filter.Emojis.length || (v.chat.Settings || (v.chat.Settings = {}), v.chat.Settings.Filter || (v.chat.Settings.Filter = {}), v.chat.Settings.Filter.Emojis = t), !a || e.config?.Settings?.Filter?.Stickers && 0 !== e.config.Settings.Filter.Stickers.length || (v.chat.Settings || (v.chat.Settings = {}), v.chat.Settings.Filter || (v.chat.Settings.Filter = {}), v.chat.Settings.Filter.Stickers = a), e.config?.Settings?.UI)) {
                            let s = e.config.Settings.UI,
                                n = "storage",
                                o = {};
                            try {
                                o = JSON.parse(localStorage.getItem(n)) || {}
                            } catch (i) {
                                o = {}
                            }
                            let l = !1;
                            if (void 0 === o.enableMessageGrouping && s.MessageGrouping && (o.enableMessageGrouping = s.MessageGrouping.DefaultEnabled, v.storage.enableMessageGrouping = s.MessageGrouping.DefaultEnabled, v.storage.groupingTimeWindow = s.MessageGrouping.TimeWindow || 3e5, l = !0, A()), s.TypingIndicator && (s.TypingIndicator.Enabled ? void 0 === o.showTypingIndicator && (o.showTypingIndicator = !0, v.storage.showTypingIndicator = !0, l = !0, A()) : (o.showTypingIndicator = !1, v.storage.showTypingIndicator = !1, v.typingDisabledByServer = !0, l = !0, A())), l) try {
                                localStorage.setItem(n, JSON.stringify(o))
                            } catch (r) {
                                console.error("Failed to update storage:", r)
                            }
                        }
                        e.Permissions && (e.Permissions.VIP && (v.permissions.VIP || (v.permissions.VIP = {
                            Message: {},
                            Cosmetics: !1,
                            Stickers: !1,
                            ServerEmojis: !1
                        }), e.Permissions.VIP.Message && Object.assign(v.permissions.VIP.Message, e.Permissions.VIP.Message), void 0 !== e.Permissions.VIP.Cosmetics && (v.permissions.VIP.Cosmetics = e.Permissions.VIP.Cosmetics, !0 === e.Permissions.VIP.Cosmetics && void 0 === v.storage.cosmeticsEnabled && (v.storage.cosmeticsEnabled = !0, A())), void 0 !== e.Permissions.VIP.Stickers && (v.permissions.VIP.Stickers = e.Permissions.VIP.Stickers), void 0 !== e.Permissions.VIP.ServerEmojis && (v.permissions.VIP.ServerEmojis = e.Permissions.VIP.ServerEmojis)), void 0 === e.Permissions.Cosmetics || e.Permissions.VIP?.Cosmetics || (v.permissions.VIP.Cosmetics = e.Permissions.Cosmetics, !0 === e.Permissions.Cosmetics && void 0 === v.storage.cosmeticsEnabled && (v.storage.cosmeticsEnabled = !0, A())), Object.keys(e.Permissions).forEach(t => {
                            "VIP" !== t && "Cosmetics" !== t && (v.permissions[t] = e.Permissions[t])
                        })), void 0 !== e.isDisabled && (v.chatDisabled = e.isDisabled);
                        let c = (v.permissions.Channels || []).map(e => ({
                                ...e,
                                messages: [],
                                unreadCount: 0,
                                orgColor: x.detectAndChangeAlpha(e.color, .4),
                                bgColor: `linear-gradient(90deg, ${x.detectAndChangeAlpha(e.color,.5)} 0%, ${x.detectAndChangeAlpha(e.color,.1)} 72%, rgba(0,0,0,0) 92%)`
                            })),
                            d = new Set(v.channels.map(e => e.Title)),
                            m = c.filter(e => !d.has(e.Title));
                        v.channels.push(...m)
                    },
                    setNuiFocus(e, t) {
                        fetch("https://Easy-Chat-Max/SetNuiFocus", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({
                                hasFocus: e,
                                hasCursor: t
                            })
                        }).catch(e => {
                            console.error("Failed to set NUI focus:", e)
                        })
                    },
                    onOpen() {
                        v.isPauseMenuActive || (v.showInput = !0, v.showWindow = !0, v.isChatHidden = !1, x.clearChatWindowTimer(), setTimeout(() => y.inputRef.value?.focus(), 100), x.setNuiFocus(!0, !0))
                    },
                    showModal(e) {
                        Object.assign(v.modal, {
                            show: !0,
                            type: "info",
                            title: "",
                            text: "",
                            footer: "",
                            input: !1,
                            inputValue: "",
                            inputPlaceholder: "",
                            confirmText: "نعم",
                            cancelText: "لا",
                            showCancel: !1,
                            onConfirm: null,
                            onCancel: null,
                            ...e
                        })
                    },
                    closeModal() {
                        v.modal.show = !1, v.modal.inputValue = ""
                    },
                    confirmModal() {
                        v.modal.onConfirm && v.modal.onConfirm(v.modal.inputValue), x.closeModal()
                    },
                    cancelModal() {
                        v.modal.onCancel && v.modal.onCancel(), x.closeModal()
                    },
                    detectAndChangeAlpha(e, t) {
                        let a = {
                            hex: /^#([A-Fa-f0-9]{3}){1,2}$/,
                            rgb: /^rgb\((\d{1,3}), (\d{1,3}), (\d{1,3})\)$/,
                            rgba: /^rgba\((\d{1,3}), (\d{1,3}), (\d{1,3}), (0|1|0?\.\d+)\)$/
                        };
                        if (a.hex.test(e)) {
                            let s = e;
                            return `rgba(${parseInt(4===s.length?s[1]+s[1]:s.substr(1,2),16)},${parseInt(4===s.length?s[2]+s[2]:s.substr(3,2),16)},${parseInt(4===s.length?s[3]+s[3]:s.substr(5,2),16)},${t})`
                        }
                        if (a.rgb.test(e)) {
                            let [, n, o, i] = e.match(a.rgb);
                            return `rgba(${n},${o},${i},${t})`
                        }
                        if (a.rgba.test(e)) {
                            let [, l, r, c] = e.match(a.rgba);
                            return `rgba(${l},${r},${c},${t})`
                        }
                        return e
                    }
                },
                P = () => {
                    let e = e => {
                        try {
                            let t = e.data || e.detail;
                            if (!t?.type) return;
                            p && "SET_DEBUG_MODE" !== t.type && f("NUI_EVENT", `Event received: ${t.type}`, "ON_MESSAGE" === t.type ? {
                                gId: t.message?.gId,
                                channel: t.message?.channel,
                                hasArgs: !!t.message?.args
                            } : null);
                            let a = {
                                PRE_INIT() {
                                    t.data && (v.userId = t.data.user_id, v.chat.Settings || (v.chat.Settings = {}), v.chat.Settings.Filter || (v.chat.Settings.Filter = {}), t.data.emojis && (v.chat.Settings.Filter.Emojis = t.data.emojis), t.data.stickers && (v.chat.Settings.Filter.Stickers = t.data.stickers), t.data.logo && (v.chat.LOGO = t.data.logo), v.preInitialized = !0)
                                },
                                SET_DEBUG_MODE() {
                                    p = t.enabled, v.debugMode = t.enabled, console.log("%c[Chat Debug] Debug mode " + (p ? "ENABLED" : "DISABLED"), "color: #00ff00; font-weight: bold"), p ? (console.log("%c[Chat Debug] === DUMPING BUFFERED LOGS ===", "color: #ffcc00; font-weight: bold"), console.log(`[Chat Debug] Showing last ${h.length} log entries`), h.forEach((e, t) => {
                                        let a = `[${e.timestamp}][BUFFERED][${e.category}] ${e.message}`;
                                        e.data ? console.log(a + " | Data:", JSON.stringify(e.data, null, 2)) : console.log(a)
                                    }), console.log("%c[Chat Debug] === END OF BUFFERED LOGS ===", "color: #ffcc00; font-weight: bold"), console.log("%c[Chat Debug] Current Status:", "color: #00ff00"), console.log({
                                        messagesProcessed: u,
                                        cachedMessages: v.recentMessageHashes ? v.recentMessageHashes.size : 0,
                                        currentChannel: v.currentChannel,
                                        channelsCount: v.channels.length,
                                        bufferSize: `${h.length}/100`,
                                        activePolls: Array.from(v.channelMessagesMap.values()).flat().filter(e => "poll" === e.type && e.pollData?.active).length
                                    }), console.log("%c[Chat Debug] New logs will now be printed in real-time", "color: #ffcc00")) : console.log("%c[Chat Debug] Logs will continue to be buffered (last 100 entries)", "color: #ffcc00")
                                },
                                ON_MESSAGE: () => x.onMessage(t),
                                ON_MESSAGE_EDIT() {
                                    let e = t._message || t.message || t,
                                        a = e.gId,
                                        s = e.Msg || e.message || e.text || "";
                                    if (!a) return;
                                    let n = new Map,
                                        o = !1;
                                    for (let [i, l] of v.channelMessagesMap) {
                                        let r = l.findIndex(e => e.gId === a);
                                        if (-1 !== r) {
                                            let c = JSON.parse(JSON.stringify({
                                                ...l[r],
                                                text: s,
                                                message: s,
                                                edited: !0,
                                                isEdited: !0,
                                                editedTimestamp: Date.now()
                                            }));
                                            if (c.args && Array.isArray(c.args)) {
                                                let m = 3 === c.args.length ? 2 : 2 === c.args.length ? 1 : 0;
                                                c.args[m] = s
                                            }
                                            let g = [...l];
                                            g[r] = c, n.set(i, g), v.messageIdIndex.set(a, c), o = !0
                                        } else n.set(i, [...l])
                                    }
                                    o && (M.invalidate(a), window.GroupingCache?.invalidate(a), w.invalidate(), v.channelMessagesMap = n, v.forceUpdate = Date.now(), d.emit("message-edited", e))
                                },
                                ON_MESSAGE_DELETE() {
                                    let e = t._message || t.message || t;
                                    if (!e || !e.gId) return void console.error("Cannot delete message without gId:", e);
                                    let a = e.gId;
                                    v.pinnedMessage && v.pinnedMessage.gId === a && (v.pinnedMessage = null);
                                    let s = !1;
                                    if (v.messageIdIndex.get(a))
                                        for (let [n, o] of v.channelMessagesMap) {
                                            let i = o.findIndex(e => e && e.gId === a);
                                            if (-1 !== i) {
                                                o.splice(i, 1), w.invalidate(), M.invalidate(a), window.GroupingCache?.invalidate(a), v.messageIdIndex.delete(a), s = !0;
                                                break
                                            }
                                        }
                                    for (let l of v.channels) {
                                        if (!l.messages) continue;
                                        let r = l.messages.findIndex(e => e && e.gId === a);
                                        if (-1 !== r) {
                                            l.messages.splice(r, 1), M.invalidate(a), window.GroupingCache?.invalidate(a), s = !0;
                                            break
                                        }
                                    }
                                },
                                ON_CLEAR() {
                                    let e = t.notForEveryone ? v.currentChannel : "شات العام";
                                    f("CLEAR_EVENT", `Clear chat received for channel: ${e}`, {
                                        notForEveryone: t.notForEveryone
                                    });
                                    let a = null;
                                    for (let s = 0; s < v.channels.length; s++)
                                        if (v.channels[s].Title === e) {
                                            a = v.channels[s];
                                            break
                                        } if (a) {
                                        let n = [],
                                            o = 0,
                                            i = 0;
                                        for (let l = 0; l < a.messages.length; l++) {
                                            let r = a.messages[l];
                                            r.isPinned && "poll" !== r.type ? (n.push(r), f("CLEAR_PRESERVE", "Preserving pinned message", {
                                                gId: r.gId
                                            })) : "poll" === r.type && r.pollData && !0 === r.pollData.active ? (n.push(r), o++, f("CLEAR_PRESERVE_POLL", "Preserving active poll", {
                                                gId: r.gId,
                                                question: r.pollData.question
                                            })) : i++
                                        }
                                        a.messages = n, f("CLEAR_SUMMARY", `Clear completed for channel ${e}`, {
                                            messagesCleared: i,
                                            pollsPreserved: o,
                                            totalPreserved: n.length
                                        })
                                    }
                                    let c = _.getChannelKey(e),
                                        d = v.channelMessagesMap.get(c);
                                    if (d) {
                                        let m = [],
                                            g = 0;
                                        for (let p = 0; p < d.length; p++) {
                                            let u = d[p];
                                            u.isPinned && "poll" !== u.type ? m.push(u) : v.pinnedMessage?.gId !== u.gId ? "poll" === u.type && u.pollData && !0 === u.pollData.active && (m.push(u), g++, f("CLEAR_MAP_PRESERVE_POLL", "Preserving poll in channelMessagesMap", {
                                                gId: u.gId
                                            })) : m.push(u)
                                        }
                                        v.channelMessagesMap.set(c, m), w.invalidate(), f("CLEAR_MAP_SUMMARY", "ChannelMessagesMap clear completed", {
                                            channel: e,
                                            pollsPreserved: g,
                                            totalPreserved: m.length
                                        })
                                    }
                                },
                                CHAT_DATA: () => x.chatData(t),
                                ON_OPEN: () => x.onOpen(t),
                                poll_created() {
                                    if (t.poll) {
                                        let e = {
                                            id: t.poll.id,
                                            name: t.poll.creatorName || "النظام",
                                            message: t.poll.question,
                                            type: "poll",
                                            pollData: t.poll,
                                            channel: t.poll.channelId,
                                            timestamp: Date.now()
                                        };
                                        x.handlePollMessage(e), x.updatePoll(t.poll)
                                    }
                                },
                                poll_updated: () => x.updatePoll(t.poll),
                                poll_ended() {
                                    if (t.poll && (t.poll.active = !1), x.updatePoll(t.poll), v.currentChannelPoll?.id === t.poll.id && (v.currentChannelPoll = null), t.poll && t.poll.channelId) {
                                        let e = _.getChannelKey(t.poll.channelId),
                                            a = v.channelMessagesMap.get(e);
                                        if (a) {
                                            let s = a.find(e => "poll" === e.type && e.pollData && e.pollData.id === t.poll.id);
                                            s && (s.pollData.active = !1, s.isPinned = !1, w.invalidate())
                                        }
                                        let n = v.channels.find(e => e.Title === t.poll.channelId);
                                        if (n) {
                                            let o = n.messages.find(e => "poll" === e.type && e.pollData && e.pollData.id === t.poll.id);
                                            o && (o.pollData.active = !1, o.isPinned = !1, w.invalidate())
                                        }
                                    }
                                },
                                poll_message: () => x.handlePollMessage(t.message),
                                poll_results_message: () => x.handlePollMessage(t.message),
                                poll_active() {
                                    t.poll && (v.currentChannelPoll = t.poll, v.activePolls[t.poll.id] = t.poll)
                                },
                                ON_REACTION_ERROR() {
                                    console.error("[خطأ في التفاعل]", t), v.pendingReactions && t.messageId && Object.keys(v.pendingReactions).forEach(e => {
                                        e.startsWith(t.messageId) && delete v.pendingReactions[e]
                                    }), "LIMIT_REACHED" === t.error || "CONCURRENT_OPERATION" === t.error && setTimeout(() => {}, 500)
                                },
                                ON_REACTION() {
                                    if (t.isRemoving) {
                                        let e = v.messageIdIndex.get(t.messageId);
                                        if (e && e.reactions && e.reactions[t.reaction]) {
                                            let a = t.userId?.toString();
                                            e.reactions[t.reaction] = e.reactions[t.reaction].filter(e => "string" == typeof e ? e !== a : e.id !== a), 0 === e.reactions[t.reaction].length && delete e.reactions[t.reaction], e.reactions = {
                                                ...e.reactions
                                            }, M.invalidate(t.messageId), w.invalidate()
                                        }
                                        if (v.pinnedMessage && v.pinnedMessage.gId === t.messageId && v.pinnedMessage.reactions && v.pinnedMessage.reactions[t.reaction]) {
                                            let s = t.userId?.toString();
                                            v.pinnedMessage.reactions[t.reaction] = v.pinnedMessage.reactions[t.reaction].filter(e => "string" == typeof e ? e !== s : e.id !== s), 0 === v.pinnedMessage.reactions[t.reaction].length && delete v.pinnedMessage.reactions[t.reaction], v.pinnedMessage.reactions = {
                                                ...v.pinnedMessage.reactions
                                            }
                                        }
                                    } else if (t.reactionData) {
                                        let n = v.messageIdIndex.get(t.messageId);
                                        n && (n.reactions = Vue.shallowReactive(t.reactionData || {}), M.invalidate(t.messageId), w.invalidate()), v.pinnedMessage && v.pinnedMessage.gId === t.messageId && (v.pinnedMessage.reactions = Vue.shallowReactive(t.reactionData || {}))
                                    } else {
                                        let o = null;
                                        if (o = v.messageIdIndex.get(t.messageId)) {
                                            o.reactions || (o.reactions = Vue.shallowReactive({})), o.reactions[t.reaction] || (o.reactions[t.reaction] = []);
                                            let i = t.userId?.toString(),
                                                l = o.reactions[t.reaction].findIndex(e => "string" == typeof e ? e === i : e.id === i); - 1 === l ? t.userName ? o.reactions[t.reaction].push({
                                                id: i,
                                                name: t.userName,
                                                timestamp: Date.now() / 1e3
                                            }) : o.reactions[t.reaction].push(i) : (o.reactions[t.reaction].splice(l, 1), 0 === o.reactions[t.reaction].length && delete o.reactions[t.reaction]), o.reactions = {
                                                ...o.reactions
                                            }, M.invalidate(t.messageId), w.invalidate()
                                        }
                                        if (v.pinnedMessage && v.pinnedMessage.gId === t.messageId) {
                                            v.pinnedMessage.reactions || (v.pinnedMessage.reactions = Vue.shallowReactive({})), v.pinnedMessage.reactions[t.reaction] || (v.pinnedMessage.reactions[t.reaction] = []);
                                            let r = t.userId?.toString(),
                                                c = v.pinnedMessage.reactions[t.reaction].findIndex(e => "string" == typeof e ? e === r : e.id === r); - 1 === c ? t.userName ? v.pinnedMessage.reactions[t.reaction].push({
                                                id: r,
                                                name: t.userName,
                                                timestamp: Date.now() / 1e3
                                            }) : v.pinnedMessage.reactions[t.reaction].push(r) : (v.pinnedMessage.reactions[t.reaction].splice(c, 1), 0 === v.pinnedMessage.reactions[t.reaction].length && delete v.pinnedMessage.reactions[t.reaction]), v.pinnedMessage.reactions = {
                                                ...v.pinnedMessage.reactions
                                            }
                                        }
                                    }
                                },
                                LOCAL_ASSETS() {
                                    if (t.data) {
                                        let e = new Map,
                                            a = new Map;
                                        t.data.emojis && t.data.emojis.forEach(t => {
                                            let a = "string" == typeof t ? t : t.url || t.src || t;
                                            if (!e.has(a)) {
                                                let s = "string" == typeof t ? {
                                                    url: t,
                                                    source: "local"
                                                } : {
                                                    ...t,
                                                    source: "local"
                                                };
                                                e.set(a, s)
                                            }
                                        }), t.data.stickers && t.data.stickers.forEach(e => {
                                            let t = "string" == typeof e ? e : e.url || e.src || e;
                                            if (!a.has(t)) {
                                                let s = "string" == typeof e ? {
                                                    url: e,
                                                    source: "local"
                                                } : {
                                                    ...e,
                                                    source: "local"
                                                };
                                                a.set(t, s)
                                            }
                                        }), v.discordAssets.emojis.forEach(t => {
                                            if ("discord" === t.source) {
                                                let a = t.url || t.src || t;
                                                e.set(a, t)
                                            }
                                        }), v.discordAssets.stickers.forEach(e => {
                                            if ("discord" === e.source) {
                                                let t = e.url || e.src || e;
                                                a.set(t, e)
                                            }
                                        });
                                        let s = Array.from(e.values()),
                                            n = Array.from(a.values());
                                        v.discordAssets.emojiByIndex.clear(), v.discordAssets.stickerByIndex.clear(), v.discordAssets.emojiUrlCache.clear(), s.forEach((e, t) => {
                                            v.discordAssets.emojiByIndex.set(t, e);
                                            let a = `:${t}:`;
                                            v.discordAssets.emojiUrlCache.set(a, e.url || e.src)
                                        }), n.forEach((e, t) => {
                                            v.discordAssets.stickerByIndex.set(t, e)
                                        }), v.discordAssets.emojis = s, v.discordAssets.stickers = n, v.discordAssets.isLoaded = !0, v.discordAssets.isLoading = !1
                                    }
                                },
                                ON_REACTION_REMOVED_ALL() {
                                    let e = v.messageIdIndex.get(t.messageId);
                                    e && e.reactions && e.reactions[t.reaction] && (delete e.reactions[t.reaction], e.reactions = {
                                        ...e.reactions
                                    }), v.pinnedMessage && v.pinnedMessage.gId === t.messageId && v.pinnedMessage.reactions && v.pinnedMessage.reactions[t.reaction] && (delete v.pinnedMessage.reactions[t.reaction], v.pinnedMessage.reactions = {
                                        ...v.pinnedMessage.reactions
                                    })
                                },
                                REACTION_DETAILS() {
                                    y.optionsPanelRef.value && y.optionsPanelRef.value.handleReactionDetails && y.optionsPanelRef.value.handleReactionDetails(t.data)
                                },
                                ON_TYPING() {
                                    if (v.storage.showTypingIndicator && v.showInput && t.userId !== v.userId && t.channel === v.currentChannel) {
                                        let e = t.userName;
                                        o.addUser(e)
                                    }
                                },
                                TYPING_BATCH() {
                                    if (!v.storage.showTypingIndicator || !v.showInput) return;
                                    let e = t.data || t;
                                    Object.keys(e).forEach(t => {
                                        let a = e[t];
                                        if (a.channel !== v.currentChannel || a.userId === v.userId) return;
                                        let s = a.userName;
                                        o.addUser(s)
                                    })
                                },
                                REMOVE_TYPING() {
                                    let e = t.data || t,
                                        {
                                            userId: a,
                                            userName: s,
                                            channels: n
                                        } = e;
                                    n && n.includes(v.currentChannel) && o.removeUser(s)
                                },
                                ON_PIN_MESSAGE() {
                                    let e = null;
                                    (e = v.messageIdIndex.get(t.messageId)) && t.channel === v.currentChannel && (e.isPinned = !0, M.updateFlag(t.messageId, "isPinned", !0), w.invalidate(), v.pinnedMessage = {
                                        ...e,
                                        channel: t.channel,
                                        reactions: e.reactions ? {
                                            ...e.reactions
                                        } : {}
                                    })
                                },
                                ON_UNPIN_MESSAGE() {
                                    if (v.pinnedMessage?.gId === t.messageId && t.channel === v.currentChannel) {
                                        v.pinnedMessage = null;
                                        let e = v.messageIdIndex.get(t.messageId);
                                        e && (e.isPinned = !1, M.updateFlag(t.messageId, "isPinned", !1), w.invalidate())
                                    }
                                },
                                PAUSE_MENU_STATE() {
                                    t.data && "boolean" == typeof t.data.isPaused && (v.isPauseMenuActive = t.data.isPaused, t.data.isPaused ? (v.wasWindowOpenBeforePause = v.showWindow, v.wasInputOpenBeforePause = v.showInput, v.showWindow = !1, v.showInput = !1, v.isChatHidden = !0, x.setNuiFocus(!1, !1)) : (v.wasWindowOpenBeforePause && (v.showWindow = !0, v.isChatHidden = !1), v.wasWindowOpenBeforePause = !1, v.wasInputOpenBeforePause = !1))
                                }
                            };
                            a[t.type] && a[t.type]()
                        } catch (s) {
                            console.error("[خطأ في معالج الرسائل]", s, e.data || e.detail)
                        }
                    };
                    return document.addEventListener("click", e => {
                        if (!v.showOptionsPanel || e.target.closest(".options-button") || e.target.closest(".options-panel-container") || (v.showOptionsPanel = !1), v.showEmojis && !e.target.closest(".emoji-picker-wrapper") && !e.target.closest(".emoji-trigger") && !e.target.closest(".sticker-trigger") && !e.target.closest(".message-action-btn") && !e.target.closest(".emoji-picker-custom") && !e.target.closest(".emoji-sticker-toggle")) {
                            v.showEmojis = !1, v.reactingMessageId = null, v.activePickerTab = "emojis";
                            let t = v.inputRef?.stickers?.length > 0;
                            v.showExpansion = v.replyingTo || v.showChannelsPanel || t
                        }
                        if (v.showChannelsPanel && !e.target.closest(".channels-panel-container") && !e.target.closest(".channels-toggle-btn") && !e.target.closest(".channel-panel")) {
                            v.showChannelsPanel = !1;
                            let a = v.inputRef?.stickers?.length > 0;
                            v.showExpansion = v.replyingTo || v.showEmojis || v.showPollsPanel || a
                        }
                        if (v.showPollsPanel && !e.target.closest(".polls-panel-container") && !e.target.closest(".poll-toggle-btn")) {
                            v.showPollsPanel = !1;
                            let s = v.inputRef?.stickers?.length > 0;
                            v.inputRef?.showMentionSuggestions && v.inputRef, v.showExpansion = v.replyingTo || v.showEmojis || v.showChannelsPanel || s
                        }
                    }, !0), document.addEventListener("keydown", e => {
                        (e.ctrlKey || e.metaKey) && "f" === e.key && v.showInput && (e.preventDefault(), v.search.show ? S.closeSearch() : S.openSearch())
                    }), window.addEventListener("message", e), () => {
                        window.removeEventListener("message", e), o.destroy()
                    }
                },
                D = null,
                B = e => {
                    "Escape" === e.key && (v.showOptionsPanel ? v.messageContext ? x.closeMessageOptions() : x.toggleOptionsPanel() : v.showInput && x.hideInput(!0))
                },
                j = e => {
                    if (!v.showOptionsPanel) return;
                    let t = document.querySelector(".options-panel-wrapper"),
                        a = document.querySelector(".options-button.modern"),
                        s = e.target.closest(".message-item");
                    a?.contains(e.target) || t?.contains(e.target) || s && "true" === s.dataset.hasGid || (v.messageContext ? x.closeMessageOptions() : x.toggleOptionsPanel())
                };
            e(async () => {
                await r.load(), v.emojiData = r.data, document.documentElement.setAttribute("data-message-style", v.storage.messageStyle || "default"), y.messagesRef.value && i.init(y.messagesRef.value), setTimeout(() => {
                    v.discordAssets.isLoaded || x.requestAssetsFromClient()
                }, 100), document.addEventListener("keydown", B), document.addEventListener("click", j, !0), fetch("https://Easy-Chat-Max/chatInitialized", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({})
                }).catch(() => {}), D = P(), v.storage.color && (document.documentElement.style.setProperty("--chat-color-1", v.storage.color), document.documentElement.style.setProperty("--chat-color-2", v.storage.color))
            }), t(() => {
                i.destroy(), "function" == typeof D && D(), document.removeEventListener("keydown", B), document.removeEventListener("click", j, !0)
            }), a(() => y.messagesRef.value, e => {
                e && (i.destroy(), i.init(e))
            });
            let A = m.debounce(() => {
                localStorage.setItem("storage", JSON.stringify(v.storage))
            }, 500);
            return a(() => v.message, m.debounce(e => {}, 100)), a(T.currentChannelMessages, e => {
                window.MentionService && e && window.MentionService.updateKnownUsers(e), v.isChatHidden || (x.clearChatWindowTimer(), v.showWindow = !0, x.resetChatWindowTimer()), s(() => {
                    y.messagesRef.value && i.softScrollToBottom()
                })
            }, {
                deep: !0
            }), {
                ...toRefs(v),
                ...y,
                ...T,
                ...x,
                handleChannelSwitch(e) {
                    v.currentChannel = e, v.pinnedMessage = null;
                    let t = v.channels.find(t => t.Title === e);
                    t && (t.unreadCount = 0);
                    let a = v.permissions.Channels?.find(t => t.Title === e);
                    a && (a.unreadCount = 0);
                    let s = document.querySelector(".channels-component");
                    s && s.dispatchEvent(new CustomEvent("clear-unread", {
                        detail: {
                            channelId: e
                        }
                    })), n.add(() => {
                        y.messagesRef.value && i.forceScrollToBottom()
                    }, "high")
                },
                templates: {
                    default: '{0} <span class="only-msg">{1}</span>',
                    defaultAlt: "{0}",
                    print: "<pre>{0}</pre>"
                },
                debugLog: f,
                scrollToBottom() {
                    i.scrollToBottom(!0)
                },
                activePickerTab: toRef(v, "activePickerTab"),
                discordAssets: toRef(v, "discordAssets"),
                showExpansion: T.showExpansion,
                showPollModal: toRef(v, "showPollModal"),
                showPollsPanel: toRef(v, "showPollsPanel"),
                currentChannelPoll: toRef(v, "currentChannelPoll"),
                showQuickChannelSwitcher: toRef(v, "showQuickChannelSwitcher"),
                hasMultipleChannels: T.hasMultipleChannels,
                totalUnreadCount: T.totalUnreadCount,
                currentChannelColor: T.currentChannelColor,
                selectedMessageId: toRef(v, "selectedMessageId")
            }
        },
        render: function(e, t) {
            let a = _resolveComponent("search-bar"),
                s = _resolveComponent("message-component"),
                n = _resolveComponent("quick-channel-switcher"),
                o = _resolveComponent("tip-tap-input"),
                i = _resolveComponent("typing-indicator"),
                l = _resolveComponent("options-panel"),
                r = _resolveComponent("polls-panel"),
                c = _resolveComponent("emoji-picker");
            return _openBlock(), _createElementBlock("div", {
                class: _normalizeClass(["chat-container", e.storage.theme, {
                    "chat-hidden": !e.showWindow || e.isChatHidden,
                    "chat-visible": e.showWindow && !e.isChatHidden,
                    "chat-open": e.showInput
                }])
            }, [_createCommentVNode(" Search Bar Component "), _createVNode(_Transition, {
                name: "search-slide"
            }, {
                default: _withCtx(() => [e.search.show ? (_openBlock(), _createBlock(a, {
                    key: 0,
                    messages: e.currentChannelMessages,
                    onClose: e.closeSearch
                }, null, 8, ["messages", "onClose"])) : _createCommentVNode("v-if", !0)]),
                _: 1
            }), _createCommentVNode(" Messages Area "), _createElementVNode("div", {
                ref: "messagesRef",
                class: "messages-container"
            }, [_createElementVNode("ul", {
                class: "messages-list"
            }, [(_openBlock(!0), _createElementBlock(_Fragment, null, _renderList(e.currentChannelMessages, (t, a) => (_openBlock(), _createBlock(s, {
                key: (t.gId || a) + "_" + (t.editedTimestamp || t.timestamp || 0),
                message: t,
                previousMessage: a > 0 ? e.currentChannelMessages[a - 1] : null,
                nextMessage: a < e.currentChannelMessages.length - 1 ? e.currentChannelMessages[a + 1] : null,
                templates: e.templates,
                userId: e.userId,
                storage: e.storage,
                chat: e.chat,
                currentChannel: e.currentChannel,
                onReply: e.startReply,
                onReact: e.handleReaction,
                isPinned: t.gId && e.pinnedMessage?.gId === t.gId,
                isSelected: t.gId && e.selectedMessageId === t.gId,
                canPin: e.permissions.Pin,
                emojiData: e.emojiData,
                discordAssets: e.discordAssets,
                onShowOptions: e.showMessageOptions,
                onShowLinkModal: e.showLinkModal
            }, null, 8, ["message", "previousMessage", "nextMessage", "templates", "userId", "storage", "chat", "currentChannel", "onReply", "onReact", "isPinned", "isSelected", "canPin", "emojiData", "discordAssets", "onShowOptions", "onShowLinkModal"]))), 128))])], 512), _createCommentVNode(" Input Area "), _withDirectives(_createElementVNode("div", {
                class: "input-area-modern",
                style: {
                    position: "relative"
                }
            }, [_createCommentVNode(" Quick Channel Switcher Dropdown - Positioned below the hashtag button "), e.showQuickChannelSwitcher ? (_openBlock(), _createElementBlock("div", {
                key: 0,
                style: {
                    position: "absolute",
                    top: "65px",
                    left: "105px",
                    "z-index": "1000"
                }
            }, [_createVNode(n, {
                "current-channel": e.currentChannel,
                channels: e.channels,
                show: e.showQuickChannelSwitcher,
                onSwitchChannel: e.handleChannelSwitch,
                onClose: () => e.showQuickChannelSwitcher = !1
            }, null, 8, ["current-channel", "channels", "show", "onSwitchChannel", "onClose"])])) : _createCommentVNode("v-if", !0), _createCommentVNode(" Reply Bar "), _createVNode(_Transition, {
                name: "slide-fade"
            }, {
                default: _withCtx(() => [e.replyingTo && e.processedReplyBar ? (_openBlock(), _createElementBlock("div", {
                    key: 0,
                    class: "reply-bar-glass"
                }, [_createElementVNode("div", {
                    class: "reply-content"
                }, [_createElementVNode("i", {
                    class: "fa-solid fa-reply",
                    style: _normalizeStyle({
                        color: e.processedReplyBar.authorColor
                    })
                }, null, 4), _createElementVNode("span", {
                    style: _normalizeStyle({
                        color: e.processedReplyBar.authorColor
                    })
                }, _toDisplayString(e.processedReplyBar.author), 5), _createElementVNode("span", {
                    class: "reply-preview",
                    innerHTML: e.processedReplyBar.text
                }, null, 8, ["innerHTML"])]), _createElementVNode("button", {
                    onClick: e.cancelReply,
                    class: "reply-cancel"
                }, [_createElementVNode("i", {
                    class: "fa-solid fa-times"
                })], 8, ["onClick"])])) : _createCommentVNode("v-if", !0)]),
                _: 1
            }), _createCommentVNode(" Main Input Container "), _createElementVNode("div", {
                class: "input-glass-container"
            }, [_createElementVNode("div", {
                class: _normalizeClass(["input-modern-wrapper", {
                    "with-send": e.message.trim()
                }])
            }, [_createCommentVNode(" Left Action Zone - MODIFIED "), _createElementVNode("div", {
                class: "action-zone"
            }, [_createCommentVNode(" Emoji/Sticker Toggle stays the same "), _createElementVNode("button", {
                class: _normalizeClass(["action-button", "emoji-sticker-toggle", {
                    "sticker-mode": "stickers" === e.activePickerTab
                }]),
                onClick: e.togglePicker,
                title: "emojis" === e.activePickerTab ? "الإيموجيات" : "الستكرز"
            }, [_createElementVNode("span", {
                class: "toggle-icon emoji-icon"
            }, [e.emojiData && e.emojiData.emojis ? (_openBlock(), _createElementBlock("img", {
                key: 0,
                src: "https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/1f60a.png",
                alt: "\uD83D\uDE0A",
                class: "apple-emoji-icon"
            })) : (_openBlock(), _createElementBlock("span", {
                key: 1
            }, "\uD83D\uDE0A"))]), _createElementVNode("span", {
                class: "toggle-icon sticker-icon"
            }, [_createElementVNode("i", {
                class: "fa-solid fa-note-sticky"
            })]), _createElementVNode("span", {
                class: "action-tooltip"
            }, _toDisplayString("emojis" === e.activePickerTab ? "الإيموجيات" : "الستكرز"), 1)], 10, ["onClick", "title"]), _createCommentVNode(" Channel Toggle Button - Only show if multiple channels "), e.hasMultipleChannels ? (_openBlock(), _createElementBlock("button", {
                key: 0,
                class: _normalizeClass(["action-button channels-toggle-btn", {
                    active: e.showQuickChannelSwitcher,
                    "has-unread": e.totalUnreadCount > 0
                }]),
                onClick: e.toggleChannelsPanel,
                style: _normalizeStyle({
                    background: "linear-gradient(135deg, " + e.currentChannelColor + "15, " + e.currentChannelColor + "20)"
                })
            }, [_createElementVNode("i", {
                class: "fa-solid fa-hashtag"
            }), e.totalUnreadCount > 0 ? (_openBlock(), _createElementBlock("span", {
                key: 0,
                class: "unread-badge"
            }, _toDisplayString(e.totalUnreadCount > 99 ? "99+" : e.totalUnreadCount), 1)) : _createCommentVNode("v-if", !0), _createElementVNode("span", {
                class: "action-tooltip"
            }, "القنوات")], 14, ["onClick"])) : _createCommentVNode("v-if", !0)]), _createCommentVNode(" TipTap Input - Enhanced Editor "), _createVNode(o, {
                ref: "inputRef",
                modelValue: e.message,
                "onUpdate:modelValue": t => e.message = t,
                placeholder: e.chatDisabled ? "⚠️ الشات معطل من قبل الإدارة" : "شات العام" === e.currentChannel ? "اكتب رسالتك هنا..." : "اكتب في " + e.currentChannel + "...",
                emojis: e.discordAssets?.emojis?.map(e => e.url || e.src || e) || [],
                lastFiveMessages: e.lastFiveMessages,
                permissions: e.permissions,
                currentChannel: e.currentChannel,
                emojiData: e.emojiData,
                discordAssets: e.discordAssets,
                messageFont: e.permissions.VIP.Message.Font && e.storage?.messageFont || "default",
                onEnter: e.send,
                onTyping: e.handleTyping,
                onImageUpload: e.handleImageUpload,
                onImageUploaded: e.handleImageUploaded,
                class: _normalizeClass(["custom-input-modern", {
                    "chat-disabled": e.chatDisabled
                }])
            }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder", "emojis", "lastFiveMessages", "permissions", "currentChannel", "emojiData", "discordAssets", "messageFont", "onEnter", "onTyping", "onImageUpload", "onImageUploaded", "class"]), _createCommentVNode(" Right Action Zone "), _createElementVNode("div", {
                class: "right-actions"
            }, [_createCommentVNode(" Sticker Badge Button "), _createVNode(_Transition, {
                name: "fade"
            }, {
                default: _withCtx(() => [e.selectedSticker ? (_openBlock(), _createElementBlock("button", {
                    key: 0,
                    class: "sticker-button-badge",
                    onClick: t => e.selectedSticker = null,
                    title: "إزالة " + e.selectedSticker.name
                }, [_createElementVNode("img", {
                    src: e.selectedSticker.src || e.selectedSticker.url,
                    alt: e.selectedSticker.name
                }, null, 8, ["src", "alt"]), _createElementVNode("span", {
                    class: "sticker-remove-icon"
                }, [_createElementVNode("i", {
                    class: "fa-solid fa-times"
                })]), _createElementVNode("span", {
                    class: "action-tooltip"
                }, "إزالة الستكر")], 8, ["onClick", "title"])) : _createCommentVNode("v-if", !0)]),
                _: 1
            }), _createCommentVNode(" Uploaded Image Badge Button "), _createVNode(_TransitionGroup, {
                name: "fade"
            }, {
                default: _withCtx(() => [(_openBlock(!0), _createElementBlock(_Fragment, null, _renderList(e.uploadedImages, (t, a) => (_openBlock(), _createElementBlock("button", {
                    key: t.url,
                    class: "image-button-badge",
                    crossorigin: "anonymous",
                    referrerpolicy: "no-referrer",
                    onClick: t => e.$refs.inputRef?.removeUploadedImage?.(a),
                    title: "إزالة " + t.name
                }, [_createElementVNode("img", {
                    src: t.url,
                    alt: t.name,
                    crossorigin: "anonymous",
                    referrerpolicy: "no-referrer"
                }, null, 8, ["src", "alt"]), _createElementVNode("span", {
                    class: "image-remove-icon"
                }, [_createElementVNode("i", {
                    class: "fa-solid fa-times"
                })]), _createElementVNode("span", {
                    class: "action-tooltip"
                }, "إزالة الصورة")], 8, ["onClick", "title"]))), 128))]),
                _: 1
            }), _createCommentVNode(" Options Panel Toggle Button "), _createElementVNode("button", {
                class: _normalizeClass(["options-button modern", {
                    active: e.showOptionsPanel
                }]),
                onClick: _withModifiers(e.toggleOptionsPanel, ["stop"])
            }, [_createElementVNode("i", {
                class: "fa-solid fa-sliders"
            }), _createElementVNode("span", {
                class: "action-tooltip"
            }, "الإعدادات")], 10, ["onClick"])])], 2)]), _createCommentVNode(" Typing Indicator - Fixed at top of input area "), e.storage.showTypingIndicator ? (_openBlock(), _createBlock(i, {
                key: 1,
                typingUsers: e.typingUsers,
                showInput: e.showInput
            }, null, 8, ["typingUsers", "showInput"])) : _createCommentVNode("v-if", !0), _createCommentVNode(" Expansion Container "), _createElementVNode("div", {
                class: _normalizeClass(["input-expansion-container", {
                    active: e.showExpansion
                }])
            }, [_createCommentVNode(" Options Panel "), e.showOptionsPanel ? (_openBlock(), _createElementBlock("div", {
                key: 0,
                class: "options-panel-wrapper"
            }, [_createVNode(l, {
                ref: "optionsPanelRef",
                show: e.showOptionsPanel,
                storage: e.storage,
                permissions: e.permissions,
                "current-theme": e.storage.theme,
                "is-muted": e.storage.isMuted,
                "hide-avatars": e.storage.hideAvatars,
                "enable-grouping": e.storage.enableMessageGrouping,
                "show-typing-indicator": e.storage.showTypingIndicator,
                "typing-disabled-by-server": e.typingDisabledByServer,
                "has-admin-permissions": e.hasAdminPermissions,
                "message-context": e.messageContext,
                "user-id": e.userId,
                chat: e.chat,
                onClose: t => e.messageContext ? e.closeMessageOptions() : e.toggleOptionsPanel(),
                onMessageAction: e.handleMessageAction,
                onOpenEmojiPicker(t) {
                    e.showOptionsPanel = !1, e.messageContext = null, e.reactingMessageId = t, e.showEmojis = !0, e.activePickerTab = "emojis"
                },
                onThemeChange(t) {
                    e.storage.theme = t, e.saveStorageDebounced()
                },
                onToggleOption: e.handleOptionsPanelToggle,
                onExecuteAction: e.handleOptionsPanelAction,
                onUpdateNameColor: e.handleNameColorUpdate,
                onToggleCosmetics: e.handleCosmeticsToggle,
                onUpdateSetting: e.handleSettingUpdate
            }, null, 8, ["show", "storage", "permissions", "current-theme", "is-muted", "hide-avatars", "enable-grouping", "show-typing-indicator", "typing-disabled-by-server", "has-admin-permissions", "message-context", "user-id", "chat", "onClose", "onMessageAction", "onOpenEmojiPicker", "onThemeChange", "onToggleOption", "onExecuteAction", "onUpdateNameColor", "onToggleCosmetics", "onUpdateSetting"])])) : _createCommentVNode("v-if", !0), _createCommentVNode(" Polls Panel "), e.showPollsPanel ? (_openBlock(), _createElementBlock("div", {
                key: 1,
                class: "polls-panel-container"
            }, [_createVNode(r, {
                "current-channel": e.currentChannel,
                permissions: e.permissions,
                "user-id": e.userId
            }, null, 8, ["current-channel", "permissions", "user-id"])])) : _createCommentVNode("v-if", !0), _createCommentVNode(" Emoji/Sticker Picker "), _createVNode(_Transition, {
                name: "expand-down"
            }, {
                default: _withCtx(() => [e.showEmojis ? (_openBlock(), _createElementBlock("div", {
                    key: 0,
                    class: "emoji-picker-wrapper emoji-picker-glass"
                }, [_createVNode(c, {
                    emojiData: e.emojiData,
                    discordAssets: e.discordAssets,
                    activeTab: e.activePickerTab,
                    reactionMode: !!e.reactingMessageId,
                    hasStickersPermission: e.permissions.VIP?.Stickers || !1,
                    hasServerEmojisPermission: e.permissions.VIP?.ServerEmojis || !1,
                    onSelect: "emojis" === e.activePickerTab ? e.handleEmojiSelect : e.handleStickerSelect,
                    onTabChange: e.handlePickerTabChange
                }, null, 8, ["emojiData", "discordAssets", "activeTab", "reactionMode", "hasStickersPermission", "hasServerEmojisPermission", "onSelect", "onTabChange"])])) : _createCommentVNode("v-if", !0)]),
                _: 1
            })], 2)], 512), [
                [_vShow, e.showInput]
            ]), _createCommentVNode(" Modal System "), _createVNode(_Transition, {
                name: "modal"
            }, {
                default: _withCtx(() => [e.modal.show ? (_openBlock(), _createElementBlock("div", {
                    key: 0,
                    class: "modal-overlay",
                    onClick: _withModifiers(e.closeModal, ["self"])
                }, [_createElementVNode("div", {
                    class: "modal"
                }, [_createElementVNode("div", {
                    class: _normalizeClass(["modal-icon", e.modal.type])
                }, [_createElementVNode("i", {
                    class: _normalizeClass({
                        "fas fa-check-circle": "success" === e.modal.type,
                        "fas fa-times-circle": "error" === e.modal.type,
                        "fas fa-exclamation-triangle": "warning" === e.modal.type,
                        "fas fa-info-circle": "info" === e.modal.type,
                        "fas fa-question-circle": "question" === e.modal.type
                    })
                }, null, 2)], 2), e.modal.title ? (_openBlock(), _createElementBlock("h2", {
                    key: 0,
                    class: "modal-title"
                }, _toDisplayString(e.modal.title), 1)) : _createCommentVNode("v-if", !0), e.modal.text ? (_openBlock(), _createElementBlock("p", {
                    key: 1,
                    class: "modal-text"
                }, _toDisplayString(e.modal.text), 1)) : _createCommentVNode("v-if", !0), e.modal.input ? _withDirectives((_openBlock(), _createElementBlock("input", {
                    key: 2,
                    "onUpdate:modelValue": t => e.modal.inputValue = t,
                    type: "text",
                    class: "modal-input",
                    placeholder: e.modal.inputPlaceholder,
                    onKeypress: _withKeys(e.confirmModal, ["enter"])
                }, null, 40, ["onUpdate:modelValue", "placeholder", "onKeypress"])), [
                    [_vModelText, e.modal.inputValue]
                ]) : _createCommentVNode("v-if", !0), _createElementVNode("div", {
                    class: "modal-actions"
                }, [_createElementVNode("button", {
                    onClick: e.confirmModal,
                    class: "modal-button primary"
                }, _toDisplayString(e.modal.confirmText), 9, ["onClick"]), e.modal.showCancel ? (_openBlock(), _createElementBlock("button", {
                    key: 0,
                    onClick: e.cancelModal,
                    class: "modal-button secondary"
                }, _toDisplayString(e.modal.cancelText), 9, ["onClick"])) : _createCommentVNode("v-if", !0)]), e.modal.footer ? (_openBlock(), _createElementBlock("div", {
                    key: 3,
                    class: "modal-footer",
                    innerHTML: e.modal.footer
                }, null, 8, ["innerHTML"])) : _createCommentVNode("v-if", !0)])], 8, ["onClick"])) : _createCommentVNode("v-if", !0)]),
                _: 1
            })], 2)
        }
    });
    g.mount("#app")
}();
