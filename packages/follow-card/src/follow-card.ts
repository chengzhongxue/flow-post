import resetStyles from '@unocss/reset/tailwind.css?inline';
import { LitElement, css, html, unsafeCSS } from 'lit';
import {property, state} from 'lit/decorators.js';
import {ToastManager} from "./lit-toast";

export class FollowCard extends LitElement {

  @property({ type: String , attribute: 'text-align' })
  textAlign: 'left' | 'center' | 'right' = 'right';

  @property({ type: String, attribute: 'show-title' })
  showTitle = 'true';

  @property({ type: String, attribute: 'title-text' })
  titleText = '订阅最新内容推送';

  @state()
  submitting = false;

  @state()
  toastManager = new ToastManager();

  async onSubmit(e: CustomEvent) {
      e.preventDefault();
      this.submitting = true;


      const form = e.target as HTMLFormElement;
      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());

      try {
          const response = await fetch(`/apis/api.flow.post.kunkunyu.com/v1alpha1/follows/-/submit`, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                  email:data.email
              }),
          });

          if (!response.ok) {
              const { detail } = await response.json();
              this.toastManager.error(detail);
              return;
          }

          this.toastManager.success('提交成功，收到邮件请确认是否订阅');
          this.dispatchEvent(new CustomEvent('reload'));
      } catch (error) {
          if (error instanceof Error) {
              this.toastManager.error(error.message);
          }
      } finally {
          this.submitting = false;
      }
  }


  override render() {
      const justifyClass = {
          'left': 'justify-start',
          'center': 'justify-center',
          'right': 'justify-end'
      }[this.textAlign];

      return html`
          <div class="flex items-center ${justifyClass}">
              <form @submit=${this.onSubmit} class="w-full max-w-[600px]">
                  <div class="subscribe-card w-full card-padding rounded-card backdrop-blur-sm bg-card">
                      ${this.showTitle == 'true' ? html`
                      <div class="text-center mb-6 sm:mb-8">
                          <h1 class="text-xl sm:text-2xl font-semibold text-title mb-2">${this.titleText}</h1>
                      </div>
                      ` : ''}
                      <div class="flex flex-col sm:flex-row gap-4">
                          <div class="input-wrapper flex-1">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="text-description">
                                  <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
                                  <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
                              </svg>
                              <input type="email"
                                     name="email"
                                     required
                                     class="w-full px-12 py-3 sm:py-3.5 border border-input rounded-input text-title placeholder:text-description bg-input"
                                     placeholder="输入您的电子邮箱">
                          </div>
                          <button
                                  .disabled=${this.submitting}
                                  class="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-3.5 bg-button text-button rounded-button whitespace-nowrap flex items-center justify-center gap-3 shadow-lg">
                              立即订阅
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4">
                                  <path fill-rule="evenodd" d="M12.97 3.97a.75.75 0 011.06 0l7.5 7.5a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 11-1.06-1.06l6.22-6.22H3a.75.75 0 010-1.5h16.19l-6.22-6.22a.75.75 0 010-1.06z" clip-rule="evenodd" />
                              </svg>
                          </button>
                      </div>
                  </div>
              </form>
          </div>
    `;
  }

  static override styles = [
    unsafeCSS(resetStyles),
    css`
      :host {
        display: inline-block;
        width: 100%;
      }
        .subscribe-card {
            background: white;
            box-shadow: var(--follow-card-shadow, 0 10px 30px -5px rgba(0, 0, 0, 0.08));
            backdrop-filter: blur(10px);
            border: var(--follow-card-border, 1px solid rgba(255, 255, 255, 0.2));
        }

        .input-wrapper {
            position: relative;
        }

        .input-wrapper svg {
            position: absolute;
            left: 16px;
            top: 50%;
            transform: translateY(-50%);
            color: #94A3B8;
            transition: color 0.2s ease;
            width: 16px;
            height: 16px;
        }

        .input-wrapper:focus-within svg {
            color: #4F7BEF;
        }

        input {
            transition: all 0.2s ease;
        }

        input:focus {
            outline: none;
            border-color: #4F7BEF;
            box-shadow: 0 0 0 4px rgba(79, 123, 239, 0.1);
        }

        button {
            transition: all 0.2s ease;
        }

        button:hover {
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(79, 123, 239, 0.2);
        }

        button:active {
            transform: translateY(0);
        }
      @unocss-placeholder;
    `,
  ];
}

customElements.get('follow-card') || customElements.define('follow-card', FollowCard);

declare global {
  interface HTMLElementTagNameMap {
    'follow-card': FollowCard;
  }
}
